import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-with-flag',
  templateUrl: './dropdown-with-flag.component.html',
  styleUrls: ['./dropdown-with-flag.component.css']
})
export class DropdownWithFlagComponent implements OnInit {
  @Input() certified:boolean= false;
  // @Input() getValue:string = '';
  @Input() JobPerformerCertificates: any[] = [];
  selectedValue:string = '';

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    this.selectedValue = null;
  }
  
  onJobPerformerCertified(event:any){
     console.log('onJobPerformerCertified',event);
  }

}
