import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SalesforceService } from '../../services/salesforce.service';
import { Question,
         QuestionBook,
         AnswerBook,
         AnswerWrapper,
         ErrorWrapper,
         Option,
         OptionValue } from '../wrapper';

import { TESTQUESTION,
         DTQUESTION,
         FILEQUESTION,
         TAQUESTION,
         RADIOQUESTION,
         CHECKQUESTION,
         BOOKQUESTION } from '../../mock/sample';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  qbId: string;
  params: Params;

  public abItem: AnswerBook;
  public qbItem: QuestionBook;
  public questionItem: Question;
  public answerWrap: AnswerWrapper;

  // CONDITIONAL TYPES
  public radioFlag: boolean = false;
  public dataFlag: boolean = false;

  // OPTIONONLY TYPES
  public dropdownFlag: boolean = false;
  public checkboxFlag: boolean = false;

  // UNCONDITIONAL TYPES
  public textFlag: boolean = false;
  public taFlag: boolean = false;
  public dtFlag: boolean = false;
  public fileFlag: boolean = false;
  public bookFlag: boolean = false;

  public optionValues: OptionValue[] = [];
  public subQuestions: Question[] = [];
  public inpValue: string;
  public answerMap = new Map();
  public questionStack = [];

  public summary = [];

  constructor(private sfService: SalesforceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.params = params;
      console.log('App params', params);
      console.log('id', params['id']);
      this.qbId = params['id'];
      if(this.qbId) {
        if(this.qbId.length == 18) {
          console.log('Before Calling readQuestionBook() using ' + this.qbId);
          this.readQuestionBook(this.qbId);
        } else {
          console.log('Setting the Question Directly for testing');
          this.questionItem = FILEQUESTION;
          this.processQuestion();
        }
      }
    });
  }

  handleNextClick() {
    this.clearError();

    var recordId = null;
    var cQuestion: Question = new Question();
    cQuestion = this.questionItem;
    var typ = cQuestion.Type__c;
    var quesValue = cQuestion.Question__c;

    // Process Inputs
    if(this.checkboxFlag) {
      this.inpValue = '';
      // Save all the selected options in the inpValue
      for(var ov of this.optionValues.filter(item => item.checked)) {
        this.inpValue += ov.Value__c + '@@##$$';
        recordId = ov.Next_Question__c;
      }
    } else if(this.bookFlag) {
      //quesValue += '@@##$$';
      this.inpValue = '';
      var hasMissingInput = false;
      for(var item of this.questionItem.Questions__r.records) {
        if(!item.Is_Optional__c && !item.input) {
          item.error = new ErrorWrapper();
          hasMissingInput = true;
        }
        //quesValue += item.Question__c + '@@##$$';
        this.inpValue += item.input + '@@##$$';
      }

      if(hasMissingInput) { return; }
    } else if(this.dtFlag && this.inpValue) {
      if(this.questionItem.input) {
        this.inpValue += 'T' + this.questionItem.input;
      } else {
        this.inpValue += 'T00:00AM';
      }
    }

    console.log('before calling saveAnswer with ' + this.inpValue);

    // Check for the answer before saving to the DB
    if(!this.questionItem.Is_Optional__c && !this.inpValue) {
      // Show error that the question must be answered
      this.questionItem.error = new ErrorWrapper();
      return;
    }

    // Save the Answer in the DB
    this.answerWrap = new AnswerWrapper();
    this.answerWrap.abId = this.abItem.Id;
    this.answerWrap.quesId = cQuestion.Id;
    this.answerWrap.quesValue = quesValue;
    this.answerWrap.qTyp = typ;
    this.answerWrap.ansValue = this.inpValue;

    this.saveAnswer();
    // If no error then move to next steps
    if(this.questionItem.error) { return; }

    this.questionStack.push(cQuestion.Id);

    // CONDITIONAL vs OPTIONONLY & UNCONDITIONAL
    if(cQuestion.RecordType.Name == 'CONDITIONAL') {
      for(var cOpt of cQuestion.Question_Options__r.records) {
        // Radio / Data
        //console.log('Option => ' + cOpt.Value__c + ' matching with ' + ansVal);
        if(cOpt.Value__c == this.inpValue) {
          //console.log('Match Found using ' + cOpt.Next_Question__c);
          recordId = cOpt.Next_Question__c;
        }
      }

      // Could be of type Data and existing value
      if(recordId && (typ == 'Data')) {
        recordId = cQuestion.Next_Question__c;
      }
    } else {
      recordId = cQuestion.Next_Question__c;
    }

    if(recordId) {
      console.log('Before Calling readQuestion() using ' + recordId);
      this.readQuestion(recordId);
    } else {
      console.log('Summary Page Logic ' + recordId);
      // Reset the Variables
      this.inpValue = '';
      this.answerWrap = new AnswerWrapper();
      this.optionValues = [];
      this.subQuestions = [];
      this.resetFlag(typ);
      this.questionItem = null;

      // Show Summary
      for(var q of this.questionStack) {
        //console.log('Handling Question => ' + q);

        var ansWrap = this.answerMap.get(q);
        if(ansWrap) {
          //console.log('Handling Answer for ' + ansWrap.quesId + ' of type ' + ansWrap.qTyp);
          if(ansWrap.qTyp == 'Book') {
            var newStr = '';
            for(var ansStr of ansWrap.ansValue.split('@@##$$')) {
              if(newStr.length == 0) {
                newStr = ansStr;
              } else {
                newStr += ', ' + ansStr;
              }
            }
            ansWrap.ansValue = newStr;
          }

          this.summary.push(ansWrap);
        }
      }

      // Show Thank you Note
    }
  }

  handleBackClick() {
    if(this.summary) {
      this.summary = [];
    }

    // Read the previous question from DB
    this.readQuestion(this.questionStack.pop());
  }

  private readQuestionBook = (uuid: string) => this.sfService.remoteAction('NxtController.process',
    ['QuestionBook', 'read', uuid],
    this.successReadBook,
    this.failureReadBook);

  private successReadBook = (response) => {
    console.log(response);
    this.qbItem = response.questionbook;
    this.abItem = response.answerbook;

    console.log('readingQuestion using ' + this.qbItem.First_Question__c);
    this.readQuestion(this.qbItem.First_Question__c);
  }

  private failureReadBook = (response) => {

  }

  private readQuestion = (uuid: string) => this.sfService.remoteAction('NxtController.process',
    ['Question', 'read', uuid],
    this.successRead,
    this.failureRead);

  private successRead = (response) => {
    console.log(response);
    // Reset the Variables
    if(this.questionItem) {
      this.inpValue = '';
      this.answerWrap = new AnswerWrapper();
      this.optionValues = [];
      this.subQuestions = [];
      this.resetFlag(this.questionItem.Type__c);
    }
    this.questionItem = response.question;

    this.processQuestion();
  }

  private failureRead = (response) => {
    console.log('inside failureread');
    console.log(response);
  }

  private saveAnswer = () => {
    // Set the Answer Number based on the Question Stack Length
    this.answerWrap.ansNumber = this.questionStack.length + 1;

    this.sfService.remoteAction('NxtController.process',
        ['Answer', 'create', JSON.stringify(this.answerWrap)],
        this.successSave,
        this.failureSave);
  }

  private successSave = (response) => {
    console.log('inside successSave');
    console.log(response);
    if(response.status == 'success') {
      //this.abItem = response.answerbook;
      this.answerMap.set(response.answer.quesId, response.answer);
    } else {
      this.questionItem.error = new ErrorWrapper();
      this.questionItem.error.errorMsg = response.error.errorMsg;
    }
  }

  private failureSave = (response) => {
    console.log('inside failureSave');
    console.log(response);
  }

  private processQuestion = () => {
    console.log('processing question ' + this.questionItem.Name + ' existing answers are ' + this.answerMap.size); // => ' + JSON.stringify(this.questionItem));

    // Set the Flags to show right fields
    this.setFlag(this.questionItem.Type__c);

    // Check the existing answer from answerMap
    if(this.answerMap.has(this.questionItem.Id)) {
      console.log('existing answer found for this.questionItem.Name');
      var eAnswer = this.answerMap.get(this.questionItem.Id);
      // Get the existing answer from the Map
      this.inpValue = eAnswer.ansValue;
      console.log('inpValue has been set to ' + this.inpValue);
    }

    if(this.checkboxFlag) {
      // Set the Options for Checkbox
      this.setOptions(this.questionItem.Question_Options__r.records);
    } else if(this.bookFlag) {
      // Set the SubQuestions
      this.setSubQuestions(this.questionItem.Questions__r.records);
    } else if(this.dtFlag && this.inpValue) {
      // Set the Date and Time
      var dtVal = this.inpValue.split('T');
      this.inpValue = dtVal[0];
      this.questionItem.input = dtVal[1];
    }
  }

  setFlag(typ) {
    console.log('inside setFlag for ' + typ);

    if(typ) {
      // Set the Flags
      if(typ == 'Text') {
        this.textFlag = true;
      } else if(typ == 'File') {
        this.fileFlag = true;
      } else if(typ == 'DateTime') {
        this.dtFlag = true;
      } else if(typ == 'TextArea') {
        this.taFlag = true;
      } else if(typ == 'Radio') {
        this.radioFlag = true;
      } else if(typ == 'Dropdown') {
        this.dropdownFlag = true;
      } else if(typ == 'Checkbox') {
        this.checkboxFlag = true;
      } else if(typ == 'Book') {
        this.bookFlag = true;
      }
    }
  }

  resetFlag(typ) {
    if(typ) {
      // Set the Flags
      if(typ == 'Text') {
        this.textFlag = false;
      } else if(typ == 'File') {
        this.fileFlag = false;
      } else if(typ == 'DateTime') {
        this.dtFlag = false;
      } else if(typ == 'TextArea') {
        this.taFlag = false;
      } else if(typ == 'Radio') {
        this.radioFlag = false;
      } else if(typ == 'Dropdown') {
        this.dropdownFlag = false;
      } else if(typ == 'Checkbox') {
        this.checkboxFlag = false;
      } else if(typ == 'Book') {
        this.bookFlag = false;
      }
    }
  }

  setOptions(records) {
    // console.log('inside setOptions');

    for(var opt of records) {
      // console.log('adding option ' + JSON.stringify(opt));

      var ov = new OptionValue();
      ov.Id = opt.Id;
      ov.Name = opt.Name;
      ov.Value__c = opt.Value__c;
      ov.Next_Question__c = opt.Next_Question__c;
      ov.checked = false;

      if(this.inpValue && this.inpValue.split('@@##$$').includes(opt.Value__c)) {
        ov.checked = true;
      }

      this.optionValues.push(ov);
    }
  }

  setSubQuestions(records) {
    console.log('inside setSubQuestions');

    var qaMap = new Map();
    if(this.inpValue) {
      var aIndex = 0;
      for(var ansStr of this.inpValue.split('@@##$$')) {
        aIndex++;
        qaMap.set(aIndex, ansStr);
        console.log('Setting the qaMap for ' + aIndex + ' with ' + ansStr);
      }
    }

    for(var ques of records) {
      var sQues = new Question();
      sQues.Id = ques.Id;
      sQues.Name = ques.Name;
      sQues.Question__c = ques.Question__c;
      sQues.Type__c = ques.Type__c;
      sQues.Next_Question__c = ques.Next_Question__c;
      sQues.Is_Optional__c = ques.Is_Optional__c;
      sQues.Group__c = ques.Group__c;
      sQues.Question_No__c = ques.Question_No__c;

      if(qaMap.has(ques.Question_No__c)) {
        console.log('Setting input for the subQuestion ' + ques.Question_No__c + ' with ' + ansStr);
        ques.input = qaMap.get(ques.Question_No__c);
      }

      this.subQuestions.push(ques);
    }
    console.log(this.subQuestions);
  }

  optionChange(selValue) {
    this.clearError();
    // console.log('inside optionChange using ' + selValue);
    this.inpValue = selValue;
  }

  clearError() {
    if(this.questionItem.error) {
      this.questionItem.error = null;
    }
  }

  clearSQError(quesId) {
    var sqList = this.subQuestions.filter(item => item.Id == quesId);
    for(var sq of sqList){
      sq.error = null;
    }
  }

  uploadFile() {
    this.clearError();
  }

  handleSubmitClick() {
    // Save the answerbook status to completed

    // return back to source url
  }
}
