import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SalesforceService } from '../../services/salesforce.service';
import { Question,
         QuestionBook,
         AnswerBook,
         AnswerWrapper,
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
  params: Params;
  qbId: string;
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

  public questionList: Question[] = [];
  public optionValues: OptionValue[] = [];
  public inpValue: string;

  public isTitle: boolean = true;

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
          this.questionItem = BOOKQUESTION;
          this.processQuestion();
        }
      }
    });
  }

  handleNextClick() {
    var recordId = null;
    var cQuestion: Question = new Question();
    cQuestion = this.questionItem;
    var typ = cQuestion.Type__c;
    var quesValue = '';

    if(this.checkboxFlag) {
      this.inpValue = '@@##$$';
      // Save all the selected options in the inpValue
      for(var ov of this.optionValues.filter(item => item.checked)) {
        this.inpValue += ov.Value__c + '@@##$$';
        recordId = ov.Next_Question__c;
      }
    } else if(this.bookFlag) {
      quesValue = '@@##$$';
      this.inpValue = '@@##$$';
      for(var item of this.questionItem.Questions__r.records) {
        quesValue += item.Question__c + '@@##$$';
        this.inpValue += item.input + '@@##$$';
      }

      cQuestion.Question__c += quesValue;
    }

    console.log('before calling saveAnswer with ' + this.inpValue);

    // Save the Answer in the DB
    this.answerWrap = new AnswerWrapper();
    this.answerWrap.abId = this.abItem.Id;
    this.answerWrap.quesId = cQuestion.Id;
    this.answerWrap.quesValue = cQuestion.Question__c;
    this.answerWrap.qTyp = typ;
    this.answerWrap.ansValue = this.inpValue;

    this.saveAnswer();

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

    // Reset the Variables
    this.inpValue = '';
    this.resetFlag(typ);
    this.answerWrap = new AnswerWrapper();
    this.optionValues = [];
    this.questionList = [];

    if(recordId) {
      console.log('Before Calling readQuestion() using ' + recordId);
      this.readQuestion(recordId);
    } else {
      // Show Confirmation
      this.questionItem = new Question();

      // Show Thank you Note
    }
  }

  handleBackClick() {
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
    this.questionItem = response.question;
    this.processQuestion();
  }

  private failureRead = (response) => {
    console.log('inside failureread');
    console.log(response);
  }

  private saveAnswer = () => this.sfService.remoteAction('NxtController.process',
    ['Answer', 'create', JSON.stringify(this.answerWrap)],
    this.successSave,
    this.failureSave);

  private successSave = (response) => {
    console.log('inside successSave');
    console.log(response);
    this.abItem = response.answerbook;
  }

  private failureSave = (response) => {
    console.log('inside failureSave');
    console.log(response);
  }

  private processQuestion = () => {
    console.log('processing question => ' + JSON.stringify(this.questionItem));
    this.setFlag(this.questionItem.Type__c);
    if(this.checkboxFlag) {
      this.setOptions(this.questionItem.Question_Options__r.records);
      // Handling of the Question Title based on the length
      if(this.questionItem.Question__c.length > 250) {
        this.isTitle = false;
      }
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
      ov.Value__c = opt.Value__c + 'O';
      ov.Next_Question__c = opt.Next_Question__c;
      ov.checked = false;

      this.optionValues.push(ov);
    }
  }

  optionChange(selValue) {
    // console.log('inside optionChange using ' + selValue);
    this.inpValue = selValue;
  }
}
