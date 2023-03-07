import { Component, OnInit ,Input, Output,ElementRef,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() value: any | any[]; // input value
  @Input() inputType: string = ''; // for input type like text, email ,number ,..
  @Input() name : string = ''; // for inpput name 
  @Input() label: string = ''; // input label like firstname , email ,..
  @Input() placeholder?: string; // for input box place holder 
  @Input() disabled: boolean = false; // input disabled or not
  @Input() required: boolean = false; // input Required or not 
  @Input() minlength: number; // min input character long
  @Input() maxlength: number; // max input character long
  @Input() readOnly: boolean = false; // input is read only or not
  @Input() size?: number = 10;   //The size attribute specifies the visible width, in characters, of an <input> element.
  @Input() checked: boolean = false; // if input type as checkbox , to check if it is checked or not
  @Input() pattern: string; // if input type as password or number , to pass the pattern like [0-9]{3}-[0-9]{2}-[0-9]{3}
  @Input() EmailPattern : any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  @Input() min?: number;   // min value 
  @Input() max?: number;   // max value 
  @Input() validateOn: string = "";  // for validateOn which event like onInputChange, onFoucusOut , onFoucs,..
  @Input() errorMessagePosition: string = 'top'; // to specify the error message position are top , bottom-left,bottom-right,bottom-center
  @Input() errorMessage: string =''; // errro message like 'please enter  valid email'
  @Output() inputValue = new EventEmitter<any>(); // used to pass the selected value to parent 
  @Output() validityChange = new EventEmitter<boolean>();
  validateOnInputs : string[] = [];  // maintain the validateOn input values 
  public showError: boolean = false;  // used to show eror or remove
  public isRequired: boolean = false; // use to show required error or remove
  public checkedValues =[];

  constructor(private el: ElementRef) {
   }

  ngOnInit(): void {
    this.validateOnInputs = this.validateOn.split(",");

  }

  onInputChange(event: any) {
    this.value = event.target.value;
    // let checkboxes = document.getElementsByName(this.name) as NodeListOf<HTMLInputElement>;
    // if input type as checkbox 
    // if check box checked to emit the current checked value to parent
    if (this.inputType === 'checkbox') {
      if (event.target.checked) {
        this.checkedValues.push(event.target.value);
         console.log('this.cvalue',this.checkedValues);
     }else{
        console.log('this.cvalue else',this.checkedValues);
        const index = this.checkedValues.indexOf(event.target.value);
        if(index >= 0){
         this.checkedValues.splice(index,1);
       }
     } 
      this.inputValue.emit(this.checkedValues);
      // input type is email to check the email format
    }else if(this.inputType === 'email'){
      if (this.EmailPattern.test(this.value)) {
        // if  Valid email address 
        // don't show the error 
        // border color is default color
        this.showError = false;
        event.target.style.borderColor = '#ccc';
        this.inputValue.emit(this.value);
      } else {
        // if Invalid email address to add the error message 
        // show the erorr 
        //  border color changing to red
        this.errorMessage = 'Please enter a valid email address';
        this.showError = true;
        event.target.style.borderColor = 'red';
      }
    }
    else{
      // to emit the entered value to parent
      this.inputValue.emit(this.value);
      // to change the value data type as number to validate the min and max
      let valueNumber = parseInt(this.value);
      if(this.required && !this.value){
        // 1. if field is required but not value is entered
        // to show the error message
        // to remove the error message when no values is there in input
        // to change the border color as red
        this.isRequired = true;
        this.showError = false;
        event.target.style.borderColor = 'red';
      }else if (this.minlength && this.value.length < this.minlength) {
        // 2. if value is less than minlength
        // show the error message
        // to change the border color as red
        this.showError = true;
        event.target.style.borderColor = 'red';
        this.errorMessage = 'Field must be at least' +" "+this.minlength +" " + 'characters long';
      } else if (this.maxlength && this.value.length > this.maxlength) {
         // 3. if value is greater than maxlength
         // show the error message 
        // to change the border color as red
        this.showError = true;
        event.target.style.borderColor = 'red';
        this.errorMessage = 'Field must be atmost'+ " "+ this.maxlength +" "+ 'characters long';
      }  else if(valueNumber < this.min){
        // 4. if value is less than min value 
        // show the error message 
        // remove the required when value is there
        // to change the border color as red
        this.showError = true;
        this.isRequired = false;
        event.target.style.borderColor = 'red';
        this.errorMessage = 'value must be start with'+" "+ this.min;
      } else if(valueNumber > this.max){
      // 5. if value is greated than max value
      // show the error message 
      // remove the required when value is there
      // to change the border color as red
        this.showError = true;
        this.isRequired = false;
        event.target.style.borderColor = 'red';
        this.errorMessage ='maximum value is exceed';
      }else{
        // other wise to remove the error message and changed the default border color
        this.isRequired = false;
        this.showError = false;
        event.target.style.borderColor = '#ccc';
      }
    }
    console.log('this.cvalue after',this.checkedValues);
  }


}
