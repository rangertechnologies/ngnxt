import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NxtAppModule } from '../../projects/nxt-app/src/lib/nxt-app.module';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NxtAppModule,
    MyDatePickerModule,
    RouterModule.forRoot([
      {path: '**', component: AppComponent}
    ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
