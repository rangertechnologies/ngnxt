import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Questionaire App';
  qbId = 'a033t00000Ta1FjAAJ123';
  showLoader = true;

  //fo my
  fileTypes =["pdf", "jpg","png", "jpeg","image/png", "application/pdf"];
  public countries: any[] = [
    { name: "Afghanistan", code: "AF" },
    { name: "Åland Islands", code: "AX" },
    { name: "Albania", code: "AL" }
  ];
  checkedValues: string[] = [];
  dropdownOptions = [  { value: 'option1', label: 'Option 1' },  { value: 'option2', label: 'Option 2' },  { value: 'option3', label: 'Option 3' }];

  selectedDate: Date = new Date();
  minDate: Date = new Date('2000-01-01');
  maxDate: Date = new Date('2030-12-31');

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      //console.log('App params', params);
      //console.log('id', params['id']);
      this.qbId = params['id'];
    });
  }

  handleUploadedData(data:any) {
    console.log('Received uploaded data: ', data);
  }
  onNameChange(name: any){
    console.log('name is ',name);
  }


  onAgeChange(age: any){
    console.log('age is ',age);
  }
  onEmailChange(email: any){
    console.log('email is ',email);
  }
  onTelChange(tel:any){
    console.log('telephone is ',tel);
  }
  radioChange(radio:any){
    console.log('radio is ',radio);
  }
  checkChange(checkbox:string []){
    this.checkedValues = checkbox;
    // console.log('checkbox is ',this.checkedValues);
  }
  validation(val:any){
   console.log('valid',val);
  }
  slectedValue(val: any){
    console.log('dropdown', val);

  }
  onDateChange(date: Date) {
    console.log('Selected date:', date);
  }
}
