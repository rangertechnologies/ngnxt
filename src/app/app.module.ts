import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NxtAppModule } from '../../projects/nxt-app/src/lib/nxt-app.module';
import { MyDatePickerModule } from 'mydatepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarComponent } from '../../projects/nxt-app/src/lib/components/progress-bar/progress-bar.component';
import { FileUploadComponent } from '../../projects/nxt-app/src/lib/components/file-upload/file-upload.component';
import { DropzoneDirective } from '../../projects/nxt-app/src/lib/directives/dropzone/dropzone.directive';
import { InputComponent } from '../../projects/nxt-app/src/lib/components/input/input.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    FileUploadComponent,
    DropzoneDirective,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NxtAppModule,
    MyDatePickerModule,
    RouterModule.forRoot([
      {path: '**', component: AppComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
