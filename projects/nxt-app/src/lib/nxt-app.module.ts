import { NgModule } from '@angular/core';
import { NxtAppComponent } from './nxt-app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [NxtAppComponent, QuestionnaireComponent],
  imports: [
    CommonModule, FormsModule,
    MyDatePickerModule
  ],
  exports: [NxtAppComponent, QuestionnaireComponent]
})
export class NxtAppModule { }
