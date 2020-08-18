import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SalesforceService } from '../../services/salesforce.service';
import { Question, QuestionBook, AnswerBook } from '../wrapper';
import { TESTQUESTION, TESTQUESTIONS } from '../../mock/sample';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  params: Params;
  tstQuestions = TESTQUESTIONS;
  questionItem = TESTQUESTION; // Question;

  constructor(private sfService: SalesforceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.params = params;
      console.log('App params', params);
      console.log('id', params['id']);
    });
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
