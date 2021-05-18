import { NgModule } from '@angular/core';
import { NxtAppComponent } from './nxt-app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [NxtAppComponent, QuestionnaireComponent],
  imports: [
    CommonModule, FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 7,
      "radius": 60,
      "space": -2,
      "outerStrokeWidth": 2,
      "outerStrokeColor": "#808080",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 2,
      "title": [
                "working",
                "in",
                "progress"
      ],
      // titleFontSize: 12,
      // "subtitleFontSize": 20,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "clockwise":true})
  ],
  exports: [NxtAppComponent, QuestionnaireComponent]
})
export class NxtAppModule { }
