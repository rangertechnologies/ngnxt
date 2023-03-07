import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NxtAppModule } from '../../projects/nxt-app/src/lib/nxt-app.module';
import { MyDatePickerModule } from 'mydatepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarComponent } from '../../projects/nxt-app/src/lib/components/progress-bar/progress-bar.component';
import { FileUploadComponent } from '../../projects/nxt-app/src/lib/components/file-upload/file-upload.component';
import { DropzoneDirective } from '../../projects/nxt-app/src/lib/directives/dropzone/dropzone.directive';
import { InputComponent } from '../../projects/nxt-app/src/lib/components/input/input.component';
import { CustomDropdownComponent } from '../../projects/nxt-app/src/lib/components/custom-dropdown/custom-dropdown.component';
import {MatSelectModule} from '@angular/material/select';
import { CustomDatePickerComponent } from '../../projects/nxt-app/src/lib/components/custom-date-picker/custom-date-picker.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    FileUploadComponent,
    DropzoneDirective,
    InputComponent,
    CustomDropdownComponent,
    CustomDatePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NxtAppModule,
    MyDatePickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    RouterModule.forRoot([
      {path: '**', component: AppComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
