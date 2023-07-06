import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-with-flag',
  templateUrl: './dropdown-with-flag.component.html',
  styleUrls: ['./dropdown-with-flag.component.css']
})
export class DropdownWithFlagComponent implements OnInit {
  @Input() certified:boolean= false;
  // @Input() getValue:string = '';
  @Input() JobPerformerCertificates: any[] = [];
  @Output() flagDropDownChange: EventEmitter<any> = new EventEmitter<any>(); 
  selectedValue:string = '';

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    this.selectedValue = null;
  }
  
  onJobPerformerCertified(event:any){
     this.flagDropDownChange.emit(event);
  }

}
