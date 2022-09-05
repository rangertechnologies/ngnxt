import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NxtAppComponent } from './nxt-app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { MyDatePickerModule } from 'mydatepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [NxtAppComponent, QuestionnaireComponent],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule, 
    NgCircleProgressModule.forRoot({
      "backgroundGradient": true,
      "backgroundColor": "#e29d98",
      "backgroundGradientStopColor": "#c5281c",
      "backgroundStroke": "#ece4e4",
      "backgroundStrokeWidth": 0,
      "backgroundPadding": -10,
      "radius": 60,
      "space": 4,
      "maxPercent": 100,
      "unitsFontSize": "35",
      "unitsColor": "#f0ebeb",
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#f7c0bf",
      "outerStrokeGradientStopColor": "#f9c9c8",
      "innerStrokeWidth": 0,
      "titleColor": "#f3eded",
      "titleFontSize": "40",
      "subtitleColor": "#444444",
      "showSubtitle": false}),
  // NgxSpinnerModule,
  // MyDatePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NxtAppComponent, QuestionnaireComponent]
})
export class NxtAppModule { }
