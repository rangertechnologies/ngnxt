import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent implements OnInit {
  @Input() options: string[];
  @Input() placeholder: string;
  @Input() selectedValue: string;
  @Input() progressBar: boolean;
  @Input() id:string;
  @Input() errorMessage: string;
  @Input() error:any;
  @Input() fromShengel: boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectChange(event:any){
    this.valueChange.emit(event);
  }

}
