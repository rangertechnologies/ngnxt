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
    });

    this.questionItem = FILEQUESTION;
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

  public getQuestionBook = () => this.sfService.remoteAction('NxtController.process',
    ['QuestionBook', 'read', ''],
    this.successGet,
    this.failureGet)
  ;

  public getQuestion = () => this.sfService.remoteAction('NxtController.process',
    ['Question', 'read', ''],
    this.successGet,
    this.failureGet)
  ;

  private successGet = (response) => {

  }

  private failureGet = (response) => {

  }
}
