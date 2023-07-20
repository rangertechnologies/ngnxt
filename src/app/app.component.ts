import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Questionaire App';
  // for testing purpose use this qbId  - qbId = 'a0e8a00000GIcC0AAL';
  qbId = '';
  serv = '';
  tkn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJyYXNoaWRAZW1hYXIudGVzdCIsInZhbGlkX2Zyb20iOjE2ODQ5OTUyMTQwMDAsInZhbGlkX3RpbGwiOjE2ODQ5OTg4MTQwMDB9.aa5CzAcDiHLTnPlN0o8ui47NcDSnBEhjvEX9BBQXttU';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      //console.log('App params', params);
      if (params['id']) {
        this.qbId = params['id'];
      }
      console.log('id', params['id']);

      if (params['serv']) {
        this.serv = params['serv'];
      }
    });
    
  }

  // handleUploadedData(data:any) {
  //   console.log('Received uploaded data: ', data);
  // }
  // onNameChange(name: any){
  //   console.log('name is ',name);
  // }


  // onAgeChange(age: any){
  //   console.log('age is ',age);
  // }
  // onEmailChange(email: any){
  //   console.log('email is ',email);
  // }
  // onTelChange(tel:any){
  //   console.log('telephone is ',tel);
  // }
  // radioChange(radio:any){
  //   console.log('radio is ',radio);
  // }
  // checkChange(checkbox:string []){
  //   this.checkedValues = checkbox;
  // }
  // validation(val:any){
  //  console.log('valid',val);
  // }
  // slectedValue(val: any){
  //   console.log('dropdown', val);

  // }
  // onDateChange(date: Date) {
  //   console.log('Selected date:', date);
  // }
}
