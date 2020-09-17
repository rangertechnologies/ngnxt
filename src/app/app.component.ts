import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Questionaire App';
  qbId = 'a033t00000Ta1FjAAJ123';
}

/*
  constructor(private sfService: SalesforceService) {
    console.log('inside constructor');
  }

  public getQuestionBook = () => this.sfService.remoteAction('NxtController.process',
    ['QuestionBook', 'read', ''],
    this.successGet,
    this.failureGet)

  public getQuestion = () => this.sfService.remoteAction('NxtController.process',
    ['Question', 'read', ''],
    this.successGet,
    this.failureGet)

  private successGet = (response) => {

  }

  private failureGet = (response) => {

  }
}
*/
