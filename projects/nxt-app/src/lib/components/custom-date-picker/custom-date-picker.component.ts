import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css']
})
export class CustomDatePickerComponent implements OnInit {
  @Input() date: any;
  @Input() minDate:any;
  @Input() maxDate:any;
  @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(event: any) {
    this.dateChange.emit(event);
  }

}
