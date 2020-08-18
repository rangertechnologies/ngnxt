import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent}
    ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
