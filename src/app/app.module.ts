import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';

import { NxtAppComponent, QuestionnaireComponent } from 'nxt-app';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    NxtAppComponent,
    QuestionnaireComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '**', component: AppComponent}
    ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
