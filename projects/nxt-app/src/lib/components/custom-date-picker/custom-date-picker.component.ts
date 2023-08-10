import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css']
})
export class CustomDatePickerComponent implements OnInit {
  @Input() date: string;
  @Input() minDate:any;
  @Input() maxDate:any;
  @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
  dateSelected:any
  constructor() { }

  ngOnInit(): void {
   this.dateSelected = new Date(this.date);
  }

  onDateChange(event: any) {
    this.dateChange.emit(event);
  }

}
