import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NxtAppComponent } from './nxt-app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxSpinnerModule } from "ngx-spinner";
import { LookupComponent } from './lookup/lookup.component';
@NgModule({
  declarations: [NxtAppComponent, QuestionnaireComponent, LookupComponent],
  imports: [
    CommonModule, FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule, NgxSpinnerModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 7,
      "radius": 60,
      "space": -2,
      "outerStrokeWidth": 2,
      "outerStrokeColor": "#808080",
      "innerStrokeColor": "#919191",
      "innerStrokeWidth": 2,
      "title": [
                
                "%"
      ],
      // titleFontSize: 12,
      // "subtitleFontSize": 20,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "clockwise":true})
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NxtAppComponent, QuestionnaireComponent]
})
export class NxtAppModule { }
