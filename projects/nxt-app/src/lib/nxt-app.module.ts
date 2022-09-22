import { NgModule } from '@angular/core';
import { NxtAppComponent } from './nxt-app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { ListchildComponent } from './listchild/listchild.component';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [NxtAppComponent, QuestionnaireComponent, ListchildComponent, ListComponent],
  imports: [
    CommonModule, FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule
  ],
  exports: [NxtAppComponent, QuestionnaireComponent]
})
export class NxtAppModule { }
