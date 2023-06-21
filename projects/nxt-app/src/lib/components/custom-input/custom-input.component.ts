import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  @Input() value: any | any[]; // input value
  @Input() disabled: boolean = false; // input disabled or not
  @Input() placeholder:string;
  @Input() error:any;
  @Output() inputValue = new EventEmitter<any>(); 
  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(input:any){
    this.inputValue.emit(input.target.value)
  }

}
