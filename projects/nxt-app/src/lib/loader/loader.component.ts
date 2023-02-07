import { Component, OnInit,Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() visible: boolean;  //for normal loader 
  @Input() text: string;      //for normal loader text ex: loading data..

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // for ngxspinner  loader
    this.spinner.show();  
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

 // spinner Types
// ------------------
// Ball-Pulse
// Ball-Grid-Pulse
// Ball-Clip-Rotate
// Ball-Clip-Rotate-Pulse
// Square-Spin
// Ball-Clip-Rotate-Multiple
// Ball-Pulse-Rise
// Ball-Rotate
// Cube-Transition
// Ball-Zig-Zag
// Ball-Zig-Zag-Deflect
// Ball-Triangle-Path
// Ball-Scale
// Line-Scale
// Line-Scale-Party
// Ball-Scale-Multiple
// Ball-Pulse-Sync
// Ball-Beat
// Line-Scale-Pulse-Out
// Line-Scale-Pulse-Out-Rapid

}
