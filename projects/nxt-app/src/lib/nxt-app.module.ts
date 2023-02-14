import { NgModule } from '@angular/core';
import { NxtAppComponent } from './nxt-app.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
@NgModule({
  declarations: [NxtAppComponent, QuestionnaireComponent],
  imports: [
    CommonModule, FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule
  ],
  exports: [NxtAppComponent, QuestionnaireComponent]
})
export class NxtAppModule { }
