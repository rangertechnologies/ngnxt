import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent implements OnInit {
@Input() useNormalDropdown: boolean;  //  normal or mat select 
@Input() name: string; // to name or label of the dropdown
@Input() defaultValue : string; // defaualt selected value
@Input() options: {value: string, label: string}[];  // dropdown options
@Output() selectionChanged = new EventEmitter<string>(); // to pass the selected values 
selectedValue: string;  // maintain  selected value

  constructor() { }

  ngOnInit(): void {
    if (this.defaultValue) {
      // if default value is there 
      // to assign the defaul value to selected value 
      // emit that default value to parent
      this.selectedValue = this.defaultValue;
      this.selectionChanged.emit(this.selectedValue);
    }
  }

  onSelectionChange(event: any) {
    // assign the selected target value to slected value 
    // emit the selected value to parent
    this.selectedValue = event.target.value;
    this.selectionChanged.emit(this.selectedValue);
  }

}
