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
} from "@angular/core";
import { SalesforceService } from "../../services/salesforce.service";
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'lib-booklet',
  templateUrl: './booklet.component.html',
  styleUrls: ['./booklet.component.css']
})
export class BookletComponent implements OnInit {
  @Input() bookletId: string;
  @Input() serv: string;
  @Input() tkn: string;
  @Output() handleEvent = new EventEmitter();
  @Output() handlePage: EventEmitter<any> = new EventEmitter();

  public booklet: any[] = [];

  public spinnerName: string;
  public spinnerType:string;

  constructor(
    private sfService: SalesforceService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    el: ElementRef
  ) { 
    this.spinnerName = "sp1";
    this.spinnerType = "ball-spin-clockwise";
  }

  ngOnInit(): void {
    this.processBooklet();
  }

  ngOnChanges() {
    //console.log('inside Questionnaire ngOnChanges');
    this.processBooklet();
  }

  processBooklet() {
    if (this.bookletId) {
      if (this.bookletId.length == 18) {
        this.readBooklet(this.bookletId);
      }
    }
  }

  private readBooklet = (uuid: string) => {
    if(this.serv == "api") {
      this.dataService.getAPIData(
        this.tkn,
        ["Booklet", "read", uuid],
        this.successReadBooklet,
        this.failureReadBooklet
      );
    } else {
      this.sfService.remoteAction(
        "NxtController.process",
        ["Booklet", "read", uuid],
        this.successReadBooklet,
        this.failureReadBooklet
      );
    }
  }

  private successReadBooklet = (response) => {
    console.log('Inside the successReadBooklet');
    console.log(response);
    if(response != null || response != undefined){
        this.booklet = response.records;
    }

  }

  private failureReadBooklet = (response) => {

  }
}
