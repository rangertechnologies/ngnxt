import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { NxtAppModule } from 'nxt-app';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NxtAppModule,
    RouterModule.forRoot([
      {path: '**', component: AppComponent}
    ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
