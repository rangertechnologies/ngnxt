import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIMeta } from '../../interfaces/apimeta';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent implements OnInit {
  @Input() options: string[];
  @Input() placeholder: string;
  @Input() apiMeta: string;
  @Input() selectedValue: string;
  @Input() progressBar: boolean;
  @Input() id:string;
  @Input() errorMessage: string;
  @Input() error:any;
  @Input() fromShengel: boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    console.log('inside oninit of custom-dropdown of ' + this.id);
    // console.log(this.apiMeta);
    if(this.apiMeta !== undefined) {
      this.options = [];
      let apiObj: APIMeta = JSON.parse(this.apiMeta);

      this.apiResponse(apiObj.endpoint).subscribe((apiResponse) => {
        let responses = apiResponse[apiObj.variable];
        let results = [];
        for (let i = 0; i < responses.length; i++) {
          var resp = responses[i];
          // console.log(resp);
          results.push(resp[apiObj.field]);
        }
        this.options = results;
      })
    }
  }

  public apiResponse(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }

  selectChange(event:any){
    this.valueChange.emit(event);
  }

}
