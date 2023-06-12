import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-text-area',
  templateUrl: './custom-text-area.component.html',
  styleUrls: ['./custom-text-area.component.css']
})
export class CustomTextAreaComponent implements OnInit {
  @Input() value: any | any[]; // input value
  @Input() placeholder:string;
  @Input() rows:Number; //The number of visible text lines for the control
  @Output() textareaValueChange: EventEmitter<string> = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit(): void {
  }

  onTextareaChange(event:any): void {
    this.textareaValueChange.emit(event.target.value);
  }

}
