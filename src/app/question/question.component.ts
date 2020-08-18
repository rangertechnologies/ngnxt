import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SalesforceService } from '../../services/salesforce.service';
import { Question, QuestionBook, AnswerBook } from '../wrapper';
import { TESTQUESTION,
         DTQUESTION,
         FILEQUESTION,
         TAQUESTION } from '../../mock/sample';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  params: Params;
  uuid: string;
  public questionItem: Question;

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

  constructor(private sfService: SalesforceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.params = params;
      console.log('App params', params);
      console.log('id', params['id']);
      this.uuid = params['id'];
    });

    this.questionItem = FILEQUESTION;
    if(this.uuid) {
      this.readQuestionBook(this.uuid);
    }

    this.processQuestion();
  }

  private readQuestionBook = (uuid: string) => this.sfService.remoteAction('NxtController.process',
    ['QuestionBook', 'read', uuid],
    this.successRead,
    this.failureRead)
  ;

  private readQuestion = (uuid: string) => this.sfService.remoteAction('NxtController.process',
    ['Question', 'read', uuid],
    this.successRead,
    this.failureRead)
  ;

  private successRead = (response) => {
    this.questionItem = response;
    this.processQuestion();
  }

  private failureRead = (response) => {

  }

  private processQuestion = () => {
    // Set the Flags
    if(this.questionItem.RNXT__Type__c == 'Text') {
      this.textFlag = true;
    } else if(this.questionItem.RNXT__Type__c == 'File') {
      this.fileFlag = true;
    } else if(this.questionItem.RNXT__Type__c == 'DateTime') {
      this.dtFlag = true;
    } else if(this.questionItem.RNXT__Type__c == 'TextArea') {
      this.taFlag = true;
    }
  }
}
