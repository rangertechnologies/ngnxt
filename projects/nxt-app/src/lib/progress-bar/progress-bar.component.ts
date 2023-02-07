import { Component, OnInit ,Input} from '@angular/core';



@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() value: number;   // for progress value and percentage showing
  @Input() color: string;   // for color of the progress value

  constructor() { }

  ngOnInit(): void {
    
  }

}
