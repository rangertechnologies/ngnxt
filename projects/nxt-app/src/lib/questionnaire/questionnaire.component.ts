import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SalesforceService } from '../services/salesforce.service';
import { Question, QuestionBook, AnswerBook, AnswerWrapper } from '../wrapper';
import { TESTQUESTION,
         DTQUESTION,
         FILEQUESTION,
         TAQUESTION,
         RADIOQUESTION } from '../sample';

@Component({
  selector: 'lib-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})

export class QuestionnaireComponent implements OnInit {
  @Input() qbId: string;

  params: Params;
  public abItem: AnswerBook;
  public qbItem: QuestionBook;
  public questionItem: Question;
  public answerWrap: AnswerWrapper;

  // CONDITIONAL TYPES
  public radioFlag: boolean = false;
  public checkboxFlag: boolean = false;
  public dataFlag: boolean = false;

  // OPTIONONLY TYPES
  public dropdownFlag: boolean = false;

  // UNCONDITIONAL TYPES
  public textFlag: boolean = false;
  public taFlag: boolean = false;
  public dtFlag: boolean = false;
  public fileFlag: boolean = false;
  public bookFlag: boolean = false;

  public optionValues: string[];
  public inpValue: string;

  constructor(private sfService: SalesforceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    if(this.qbId) {
      if(this.qbId.length == 18) {
        console.log('Before Calling readQuestionBook() using ' + this.qbId);
        this.readQuestionBook(this.qbId);
      } else {
        console.log('Setting the Question Directly for testing');
        this.questionItem = RADIOQUESTION;
        this.processQuestion();
      }
    }
  }

  handleNextClick() {
    var recordId = null;
    var cQuestion: Question = new Question();
    cQuestion = this.questionItem;
    var typ = cQuestion.Type__c;

    // Save the Answer in the DB
    this.answerWrap = new AnswerWrapper();
    this.answerWrap.abId = this.abItem.Id;
    this.answerWrap.quesId = cQuestion.Id;
    this.answerWrap.quesValue = cQuestion.Question__c;
    this.answerWrap.qTyp = typ;
    this.answerWrap.ansValue = this.inpValue;

    console.log('before calling saveAnswer with ' + this.inpValue);
    this.saveAnswer();

    // CONDITIONAL vs OPTIONONLY & UNCONDITIONAL
    if(cQuestion.RecordType.Name == 'CONDITIONAL') {
      for(var cOpt of cQuestion.Question_Options__r) {
        //console.log(cOpt);
        //console.log('Option => ' + cOpt.Value__c + ' matching with ' + ansVal);
        if(cOpt.Value__c == this.inpValue) {
          //console.log('Match Found using ' + cOpt.Next_Question__c);
          recordId = cOpt.Next_Question__c;
        }
      }

      // Could be of type Data and existing value
      if(recordId && typ == 'Data') {
        recordId = cQuestion.Next_Question__c;
      }
    } else {
      recordId = cQuestion.Next_Question__c;
    }

    // Reset the Variables
    this.inpValue = '';
    this.resetFlag(typ);
    this.answerWrap = new AnswerWrapper();

    if(recordId) {
      console.log('Before Calling readQuestionBook() using ' + recordId);
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
  }

  setFlag(typ) {
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
      }
    }
  }

  optionChange(selValue) {
    // console.log('inside optionChange using ' + selValue);
    this.inpValue = selValue;
  }
}
