import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NxtAppComponent } from './nxt-app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [NxtAppComponent, QuestionnaireComponent],
  imports: [
    CommonModule, FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule, NgxSpinnerModule,
    /*NgCircleProgressModule.forRoot({
      "backgroundPadding": -10,
      "radius": 60,
      "space": -6,
      "innerStrokeColor": "#919191",
      "outerStrokeColor": "#db9594",
      "outerStrokeGradientStopColor": "#e0b1b0",
      "innerStrokeWidth": 2,
      "backgroundGradient": true,
      "backgroundColor": "#dd2e13",
      "backgroundGradientStopColor": "#dd2e13",
      "backgroundStroke": "#d3cfcf",
      "title": [
                
                "%"
      ],
      // titleFontSize: 12,
      // "subtitleFontSize": 20,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "clockwise":true

      //"backgroundStrokeWidth": "0",
"backgroundGradient": true,
      //"backgroundColor": "#dd2e13",
      "backgroundGradientStopColor": "#dd2e13",
      "backgroundStroke": "#000000",
      "backgroundPadding": -10,
      "radius": 60,
      "unitsFontWeight": "600",
      "unitsColor": "#f2f2f2",
      "outerStrokeGradient": true,
      "outerStrokeColor": "#e0b1b0",
      "outerStrokeGradientStopColor": "#e0b1b0",
      "outerStrokeLinecap": "inherit",
      "innerStrokeColor": "#f6dfdf",
      "title": [
                
        "%"
],
      "titleColor": "#e7d9d9",
      "titleFontSize": "31",
      "titleFontWeight": "100",
      "subtitleColor": "#f7f7f7",
      "subtitleFontSize": "36",
      "subtitleFontWeight": "900",
      "animateTitle": false,
      "animationDuration": 1000,
      "showTitle": true,
      "showUnits": true,
      "clockwise": false,
      "startFromZero": true,
      "showZeroOuterStroke": false,
      "lazy": true})*/

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
        "showSubtitle": false})
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NxtAppComponent, QuestionnaireComponent]
})
export class NxtAppModule { }
