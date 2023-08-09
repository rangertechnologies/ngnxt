import {
  Component,
  OnInit,
  OnChanges,
  Inject,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { DataService } from '../../services/data.service';
import { SalesforceService } from "../../services/salesforce.service";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemsList } from "@ng-select/ng-select/lib/items-list";

@Component({
  selector: 'lib-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input() placeHolderText: string;
  @ViewChild('auto') auto;

  public filterName: string;
  public finalResults: any[] = [];
  public searchKeyWord: string = '';
  public newResult: any;
  public showResult = false;
  public noResult = false;
  public showSuggestion = true;
  private el: HTMLElement;
  private serv: string = 'api';
  private tkn: string = '';
  
  constructor(
    private sfService: SalesforceService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    el: ElementRef
  ) { }

  ngOnInit(): void {
  }

  clearList(){
    setTimeout(()=> {
      this.finalResults = [];
    }, 500);
  }

  getSourceDataLocal(event) { //to get results list from backend API whenever key is up after the entering atleast one key
    if(event.target.value.length > 0){
      this.showSuggestion=true;
      this.finalResults=[];
      this.searchKeyWord = event.target.value;
      this.showResult = false;
      this.getSourceData(event.target.value);
    } else {
      this.showSuggestion=false;
      this.finalResults = [];
      this.noResult = false;
    }
  }

  public apiResponse(keyword: string): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }

  public getSourceData = (keyword: string) => {
    this.apiResponse('ok').subscribe((apiResponse) => {
      let results=[];
      for(Object responseItem: apiResponse.products) {
        console.log(responseItem);
      }
      this.noResult = !(results.length > 1);
      this.finalResults = results;
    })
  }

  public clickItem(event) {
    console.log('inside clickItem of ' + event.target.value);
  }
  /*
  public getSourceData = (keyword: string) => {
    if(this.serv == "api") {
      this.dataService.getAPIData(
        this.tkn,
        ["QuestionBook", "read", uuid],
        this.successSourceData,
        this.failureSourceData
      );
    } else {
      this.sfService.remoteAction(
        "NxtController.process",
        ["QuestionBook", "read", uuid],
        this.successSourceData,
        this.failureSourceData
      );
    }
  }

  public successSourceData = (response) => {
    let results=[];
    results=response.results;
    results.push({uuid: null, name: ""});
    this.noResult = !(results.length > 1);
    this.finalResults = results;
  }

  public failureSourceData = (response) => {
    console.log("Error reading the data from API");
  }
  */
}
