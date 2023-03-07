import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css']
})
export class CustomDatePickerComponent implements OnInit {
@Input() selectedDate: Date;
@Input() label: string;
@Input() minDate: Date;
@Input() placeholder: string;
@Input() maxDate: Date;
@Input() required: boolean;
@Output() dateChange: EventEmitter<Date> = new EventEmitter();
defaultDate = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.dateChange.emit(this.selectedDate);
    console.log(`Selected date: ${event.value}`);
  }

}
