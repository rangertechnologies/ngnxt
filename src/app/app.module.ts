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
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';
import { GOOGLE_MAP_API_KEY } from '../../projects/nxt-app/src/lib/sample';


@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    FileUploadComponent,
    DropzoneDirective,
    InputComponent,
    CustomDropdownComponent,
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
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAP_API_KEY,
      libraries: ['geometry', 'places', 'visualization', 'drawing']
    }),
    RouterModule.forRoot([
      {path: '**', component: AppComponent}
    ]),
    BrowserAnimationsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
