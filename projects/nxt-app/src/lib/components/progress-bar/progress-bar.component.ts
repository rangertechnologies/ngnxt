import { Component, OnInit ,Input} from '@angular/core';



@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
 @Input() value = 0 ;   // for progress value and percentage showing
 @Input() height = 20;   
 @Input() defaultWidth = 100;
 @Input() barColor = '#f2f2f2'; 
 @Input() barRadius = 0;  
 @Input() fillColor = '#4CAF50';   
 @Input() radius = 0;
 @Input() text ='';
 @Input() position ='center';

 get fontSize() {
  // The font size of the text inside the bar is calculated based on the height of the bar, 
  // with a font size of 0.8 times the height of the bar.
  if(this.height <18){
    return 0;
  }else{
    return this.height * 0.8;
  }
 
}
get textColor() {
  // the color of the text inside the bar is calculated based on the color of the fill using the YIQ color contrast formula. 
  // If the YIQ value of the fill color is greater than or equal to 128, the text color is set to black, otherwise it's set to white
  // const colorContrast = (color: string) => {
  //   let r = parseInt(color.substr(1, 2), 16);
  //   let g = parseInt(color.substr(3, 2), 16);
  //   let b = parseInt(color.substr(5, 2), 16);
  //   let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  //   return (yiq >= 128) ? 'black' : 'white';
  // }
  // return colorContrast(this.fillColor);
  if(this.value < 55){
    return 'black';
  }else{
    return 'white';
  }
}

  constructor() { }

  ngOnInit(): void {

    
  }

}
