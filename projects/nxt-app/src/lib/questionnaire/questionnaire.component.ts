import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { SalesforceService } from "../services/salesforce.service";
import { IMyDateModel, IMyDpOptions } from "mydatepicker";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

import {
  Question,
  QuestionBook,
  AnswerBook,
  AnswerWrapper,
  ErrorWrapper,
  Option,
  OptionValue,
  AttachmentWrapper,
  Attachment,
} from "../wrapper";

import {
  TESTQUESTION,
  DTQUESTION,
  FILEQUESTION,
  TAQUESTION,
  RADIOQUESTION,
  CHECKQUESTION,
  BOOKQUESTION,
  TESTQB,
} from "../sample";

@Component({
  selector: "lib-questionnaire",
  templateUrl: "./questionnaire.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./questionnaire.component.css"],
})
export class QuestionnaireComponent implements OnInit {
  @Input() qbId: string;
  @Input() insuranceStartDate: string;
  @Output() handleEvent = new EventEmitter();
  @Output() handlePage: EventEmitter<any> = new EventEmitter();

  params: Params;

  public abItem: AnswerBook;
  public qbItem: QuestionBook;
  public questionItem: Question;
  public answerWrap: AnswerWrapper;

  // CONDITIONAL TYPES
  public radioFlag: boolean = false;
  public dataFlag: boolean = false;

  // OPTIONONLY TYPES
  public dropdownFlag: boolean = false;
  public checkboxFlag: boolean = false;

  // UNCONDITIONAL TYPES
  public textFlag: boolean = false;
  public taFlag: boolean = false;
  public dtFlag: boolean = false;
  public timeFlag: boolean = false;
  public dateFlag: boolean = false;
  public fileFlag: boolean = false;
  public emailFlag: boolean = false;
  public numberFlag: boolean = false;
  public alphanumericFlag: boolean = false;
  public bookFlag: boolean = false;
  public optionValues: OptionValue[] = [];
  public subQuestions: Question[] = [];
  public inpValue: string;
  public answerMap = new Map();
  public dateMap = new Map();
  public selectedhourMap = new Map();
  public selectedminuteMap = new Map();
  public attachmentsMap = new Map();
  public sqOptions = new Map();
  public questionStack = [];
  public questionName = [];
  public attachments: any[] = [];
  public attachmentIdList: any[] = [];
  public attachmentId: string = "";
  public attachment: any;
  public allowedFileExtension: string[];
  public fileExceededLimit: boolean = false;
  public fileTypeIncorrect: boolean = false;
  public back: boolean = false;
  public check: boolean;
  public pop: boolean;
  public localDate: string;
  public currentName: string;
  public pathquestion: number;
  public percent: number;
  public count: number;
  public taFocusOut: boolean = false;
  public notValidAccNum: boolean = false;
  public summary = [];
  //public sques: string;
  public selDate: any = {};
  private today: Date = new Date();
  private el: HTMLElement;
  public innerhtml: any;
  public possibilities: any;
  public innerhtml1: any;
  public hours: any[] = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  public minutes: string[] = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];
  public selectedHour: string = "";
  public selectedMinute: string = "";
  public selectedMeridiem: string = "";
  public valueName: string = "";
  public valueName1: string = "";
  public bookFlagAccept: string[];
  public recordId: string;
  public currentQuestionId: string;
  public spinnerType: string;
  public spinnerName: string;

  //search component
  public sampleAddress: any[] = [
    {
      townId: 1255360639,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A ALBERGUERIA (LAZA)",
      zipCode: "32622",
    },
    {
      townId: 1429520775,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A ALBERGUERIA (VILAR DE BARRIO)",
      zipCode: "32705",
    },
    {
      townId: 1366720421,
      countryId: 108,
      provinceId: 36,
      language: null,
      country: "ESPAÑA",
      province: "PONTEVEDRA",
      town: "A ALDEA (CEDEIRA)",
      zipCode: "36812",
    },
    {
      townId: 134118130,
      countryId: 108,
      provinceId: 27,
      language: null,
      country: "ESPAÑA",
      province: "LUGO",
      town: "A ALENCE (SANTA LUCIA)",
      zipCode: "27677",
    },
    {
      townId: 1061318571,
      countryId: 108,
      provinceId: 15,
      language: null,
      country: "ESPAÑA",
      province: "A CORUÑA",
      town: "A AMEIXENDA (CEE)",
      zipCode: "15298",
    },
    {
      townId: 933339845,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A ASPRA",
      zipCode: "32634",
    },
    {
      townId: 1368030355,
      countryId: 108,
      provinceId: 15,
      language: null,
      country: "ESPAÑA",
      province: "A CORUÑA",
      town: "A ATALAIA (ASADOS)",
      zipCode: "15984",
    },
    {
      townId: 1972445078,
      countryId: 108,
      provinceId: 27,
      language: null,
      country: "ESPAÑA",
      province: "LUGO",
      town: "A BALSA (SANTA MARIA) (MURAS)",
      zipCode: "27817",
    },
    {
      townId: 2051563661,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A BARCA DE BARBANTES",
      zipCode: "32450",
    },
    {
      townId: 1064234582,
      countryId: 108,
      provinceId: 15,
      language: null,
      country: "ESPAÑA",
      province: "A CORUÑA",
      town: "A BARCALA (CAMBRE)",
      zipCode: "15660",
    },
    {
      townId: 690098211,
      countryId: 108,
      provinceId: 36,
      language: null,
      country: "ESPAÑA",
      province: "PONTEVEDRA",
      town: "A BARCIA (MARCON)",
      zipCode: "36158",
    },
    {
      townId: 1699522641,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A BARRA",
      zipCode: "32152",
    },
    {
      townId: 87846084,
      countryId: 108,
      provinceId: 27,
      language: null,
      country: "ESPAÑA",
      province: "LUGO",
      town: "A BASTIDA (SAN MIGUEL)",
      zipCode: "27112",
    },
    {
      townId: 1936403132,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A BOGA",
      zipCode: "32764",
    },
    {
      townId: 1539222175,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A BOLA (CAPITAL)",
      zipCode: "32812",
    },
    {
      townId: 1506169287,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A BRANDELA",
      zipCode: "32678",
    },
    {
      townId: 387113846,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A CAL (ALLARIZ)",
      zipCode: "32669",
    },
    {
      townId: 1056316633,
      countryId: 108,
      provinceId: 15,
      language: null,
      country: "ESPAÑA",
      province: "A CORUÑA",
      town: "A CAMUZA",
      zipCode: "15113",
    },
    {
      townId: 490413785,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A CANLE",
      zipCode: "32850",
    },
    {
      townId: 1590159433,
      countryId: 108,
      provinceId: 15,
      language: null,
      country: "ESPAÑA",
      province: "A CORUÑA",
      town: "A CAPELA (SANTIAGO)",
      zipCode: "15613",
    },
    {
      townId: 1154101627,
      countryId: 108,
      provinceId: 36,
      language: null,
      country: "ESPAÑA",
      province: "PONTEVEDRA",
      town: "A CARBALLEIRA (LOURIZAN)",
      zipCode: "36910",
    },
    {
      townId: 1798804971,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A CARBALLEIRA (NOGUEIRA DE RAMUIN)",
      zipCode: "32448",
    },
    {
      townId: 373795861,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A CARBALLEIRA (SAN CIBRAO DAS VIÑAS)",
      zipCode: "32901",
    },
    {
      townId: 1813158371,
      countryId: 108,
      provinceId: 32,
      language: null,
      country: "ESPAÑA",
      province: "OURENSE",
      town: "A CARIDADE",
      zipCode: "32618",
    },
    {
      townId: 1950458200,
      countryId: 108,
      provinceId: 36,
      language: null,
      country: "ESPAÑA",
      province: "PONTEVEDRA",
      town: "A CARRASQUEIRA (BUEU)",
      zipCode: "36939",
    },
  ];
  public tempoAddress: any[] = [];
  public selectedValue: string;
  public selectedPostalcode: string;
  public selectedProvince: string;
  public selectedCity: string;
  public selectedArea: string;
  public localaddress: any[] = [];

  public allAddress :any [] = [];
  public PostalCode:string;
  public places: any[] = [];
  public province:any[]=[];
 
  // REQ-01 PROGRESS BAR
  public progressStyle: string = "0%";
  public answerCount: number = 0;

  public myDatePickerOptions: IMyDpOptions = {};

  constructor(
    private sfService: SalesforceService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder
  ) {
    this.spinnerName = "sp1";
    this.spinnerType = "ball-spin-clockwise";
  }

  onDateChanged(event: IMyDateModel) {
    //to change the border color
    if (this.qbItem.Progress_Bar__c) {
      this.inpValue =
        event.date.day + "/" + event.date.month + "/" + event.date.year;
    } else {
      this.inpValue =
        event.date.year + "-" + event.date.month + "-" + event.date.day;
    }
    const htmlElement = window.document.getElementsByClassName("mydp");
    htmlElement
      .item(0)
      .setAttribute("style", "border-color:#87be1c;width:100%");
    this.dateMap.set(this.questionItem.Id, event);
    if (
      event.date.day === 0 &&
      event.date.month === 0 &&
      event.date.year === 0
    ) {
      this.dateMap.delete(this.questionItem.Id);
      this.answerMap.delete(this.questionItem.Id);
    }
  }

  ngOnInit() {
    console.log("RNXT-Claim");
    this.inpValue = "";
    this.selectedMeridiem = "AM";
    this.processQB();
    this.localaddress = JSON.parse(localStorage.getItem("address"));
    console.log('Length='+this.localaddress.length);
    this.allAddress=this.localaddress.filter((item, index) => {
      if (this.localaddress.indexOf(item) == index){
        return item;
      }
    }); 
    this.allAddress.sort(function(a, b){
      return a.zipCode - b.zipCode
    });
  }

  ngOnChanges() {
    //console.log('inside Questionnaire ngOnChanges');
    this.processQB();
  }
  date_TimeMap() {
    this.selectedhourMap.set(this.questionItem.Id, this.selectedHour);
    this.selectedminuteMap.set(this.questionItem.Id, this.selectedMinute);
  }

  day() {
    this.myDatePickerOptions = {
      dateFormat: "dd.mm.yyyy",
      sunHighlight: false,
      disableDateRanges: [],
      showClearDateBtn: false,
      disableSince: {
        year: 0,
        month: 0,
        day: 0,
      },
      disableUntil: {
        year: 0,
        month: 0,
        day: 0,
      },
      showTodayBtn: false,
      dayLabels: {
        su: "Dom",
        mo: "Lun",
        tu: "Mar",
        we: "Mié",
        th: "Jue",
        fr: "Vie",
        sa: "Sáb",
      },
      monthLabels: {
        1: "Ene",
        2: "Feb",
        3: "Mar",
        4: "Abr",
        5: "Mayo",
        6: "Jun",
        7: "Jul",
        8: "Ago",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dic",
      },
    };
  }
  change() {
    const htmlElement = window.document.getElementsByClassName("mydp");
    if (this.selDate === null || this.inpValue.length === 0) {
      htmlElement
        .item(0)
        .setAttribute("style", "width:100%;border: 1px solid red");
    } else {
      htmlElement
        .item(0)
        .setAttribute("style", "border: 1px solid #87be1c ;width:100%");
    }
  }
  //   function IncreaseTextboxSize() {
  //     var textsize = $('#txtwidth').val();
  //     $("#txtname").css("width", textsize);
  //     $("#message").html("Currently textbox Size is " + textsize + "px.");
  // }

  processQB() {
    //this.qbItem

    //console.log(this.qbId);
    //console.log('Version in process is 8bf11efa7f91a391d957bf6b5078edc7e656b67c');
    if (this.qbId) {
      if (this.qbId.length == 18) {
        //console.log('Before Calling readQuestionBook() using ' + this.qbId);
        this.readQuestionBook(this.qbId);
      } else {
        //console.log('Setting the Question Directly for testing');
        this.questionItem = DTQUESTION;
        this.qbItem = TESTQB;
        this.processQuestion();
      }
    }
    // CATEGORIZATION
    //this.stepperCateg();
  }

  trimLastDummy(input: string) {
    return (input = input.substring(0, input.length - 6));
  }

  getProperTime(def: string, input: string) {
    return input === "" ? def : input;
  }

  //Summary Question Clickable Logic
  handleEditClick(value: string) {
    if (this.abItem.Status__c == "Pending") {
      if (value == null) {
        return;
      }
      this.readQuestion(value);
      //console.log(' in side summaryopen'+ this.summary.length);

      //Assign question stack length from summary part
      var arrayLength = this.questionStack.length;
      var lengthValue = this.questionStack.indexOf(value);

      for (let i = arrayLength; i > lengthValue; i--) {
        this.questionStack.pop();
      }
      if (this.qbItem.Progress_Bar__c === true) {
        var arrayLength1 = this.questionName.length;
        for (let j = arrayLength1; j > lengthValue; j--) {
          this.questionName.pop();
        }
      }
      this.summary = [];
    }
  }

  handleNextClick() {
    //console.log(this.questionItem);

    //this.updateProgress();
    if (this.currentQuestionId === null) {
      return;
    }

    this.clearError();
    this.handleEvent.emit(this.qbItem.Next_Tracking_ID__c);
    this.recordId = null;
    var cQuestion: Question = new Question();
    cQuestion = this.questionItem;
    var typ = cQuestion.Type__c;
    // this.sques += cQuestion.Question__c + '@@##$$';
    var quesValue = cQuestion.Question_Text__c;
    var mailformat =
      "^[^.][a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+[^.]@[^-][a-zA-Z0-9.-]+[^-].[a-zA-Z]{2,}$";

    // Process Inputs
    if (this.checkboxFlag) {
      this.inpValue = "";
      // Save all the selected options in the inpValue
      for (var ov of this.optionValues.filter((item) => item.checked)) {
        this.inpValue += ov.Value__c + "@@##$$";
        this.recordId = ov.Next_Question__c;
      }
      this.inpValue = this.trimLastDummy(this.inpValue);
    } else if (this.emailFlag) {
      if (this.inpValue && this.inpValue.match(mailformat)) {
        this.recordId = this.questionItem.Next_Question__c;
      } else {
        this.questionItem.error = new ErrorWrapper();
        return;
      }
    } else if (this.alphanumericFlag) {
      var isNotValidAccNum = this.isNotValidAccNumber(this.inpValue);

      if (isNotValidAccNum) {
        this.notValidAccNum = true;
        this.recordId = this.questionItem.Next_Question__c;
        return;
      }
      this.notValidAccNum = false;
    } else if (this.numberFlag) {
      if (this.inpValue) {
        this.recordId = this.questionItem.Next_Question__c;
      } else {
        this.questionItem.error = new ErrorWrapper();
        return;
      }
    } else if (this.bookFlag) {
      this.inpValue = "";
      var hasMissingInput = false;
	  
      for (var item of this.questionItem.Questions__r.records) {
        var count = 0;
        // if(item.Type__c== "Text" && item.Question__c === 'Indica población'){
        //   for(var loc of this.localaddress){
        //     if(loc.town==this.selectedValue){
        //       //console.log('testing ')
        //       item.input=this.selectedValue;
        //       break;
        //     }else if(count == this.localaddress.length -1){
        //     //console.log('error form')
        //     item.error = new ErrorWrapper();
        //     hasMissingInput = true;
        //     return;
        //     }
        //     count++;  
        //   }
        // }

      if(item.Type__c== "Text" && item.Question__c === 'Indica población'){
          for(var loc of this.localaddress){
            if((this.selectedPostalcode == loc.zipCode)&&(this.selectedValue == loc.country)&&(this.selectedCity==loc.town)){
              item.input= this.selectedCity;
              break;
            }
            else if(count == this.localaddress.length -1){
            //console.log('error form city')
            item.error = new ErrorWrapper();
            hasMissingInput = true;
            return;
            }
            count++;  
          }
        //console.log('testin values=='+item.input)
        } 

        if(item.Type__c== "Text" && item.Question__c === 'Código postal'){
          for(var loc of this.localaddress){
            if(loc.zipCode == this.selectedPostalcode){
              console.log('testing zipcode value*****'+ this.selectedPostalcode)
              item.input=this.selectedPostalcode;
              break;
            } else if(count == this.localaddress.length -1){
            console.log('error form')
            item.error = new ErrorWrapper();
            hasMissingInput = true;
            return;
            }
            count++;  
          }
        console.log('testin values=='+item.input)
        }
        
      
      if(item.Type__c== "Text" && item.Question__c === 'Provincia'){
			  for(var loc of this.localaddress){
				  if(loc.province == this.selectedProvince){
					  console.log('******testing province value'+ this.selectedProvince)
					  item.input=this.selectedProvince;
					  break;
				  } else if(count == this.localaddress.length -1){
					console.log('error form')
					item.error = new ErrorWrapper();
					hasMissingInput = true;
					return;
				  }
				  count++;  
			  }
			console.log('testin values=='+item.input)
		  }
			 /* var loctown;
			  for(let val of this.localaddress){
                        loctown=val.town;
			  
			  if(this.selectedValue==loctown){
				  console.log('log'+loctown)
				item.input=this.selectedValue;
			  }
              
			  if (!item.input) {
				  console.log('error form')
				item.error = new ErrorWrapper();
				hasMissingInput = true;
			  }
			}
		  }*/
        if (
          !item.Is_Optional__c &&
          ((item.Type__c != "File" && !item.input) ||
            (item.Type__c == "File" && this.attachments.length == 0))
        ) {
          item.error = new ErrorWrapper();
          hasMissingInput = true;
        }
        if (item.Type__c == "Radio") {
          if (!item.input) {
            item.error = new ErrorWrapper();
            hasMissingInput = true;
          }
        }
        if (item.Type__c == "Dropdown") {
          if (!item.input) {
            item.input = "";
            item.error = new ErrorWrapper();
            hasMissingInput = true;
          }
        }
        if (item.Type__c == "Email") {
          if (item.input && item.input.match(mailformat)) {
            this.recordId = cQuestion.Next_Question__c;
          } else {
            item.error = new ErrorWrapper();
            hasMissingInput = true;
          }
        }
        if (item.Type__c == "File" && this.attachments.length > 0) {
          for (var attachmentItem of this.attachments) {
            this.inpValue +=
              attachmentItem.attachmentId +
              "@#$" +
              attachmentItem.attachmentName +
              ",";
            if (item.input == this.inpValue) {
              this.recordId = cQuestion.Next_Question__c;
              //console.log('inside' + recordId);
            }
          }
          // this.attachments = [];
        } //item.input == this.inpValue;
        this.inpValue += (item.input != undefined ? item.input : "") + "@@##$$";
        //console.log('inside book1' + this.inpValue)
      }
      if (hasMissingInput) {
        //console.log('file two')
        return;
      }
      this.inpValue = this.trimLastDummy(this.inpValue);
    } else if (this.dropdownFlag) {
      if (this.inpValue.length <= 1) {
        this.inpValue = ".";
        this.questionItem.error = new ErrorWrapper();
      }
    } else if (this.dtFlag && this.dateFlag && this.timeFlag) {
      //this one
      this.change();
      if (this.inpValue) {
        this.selectedHour = this.getProperTime("12", this.selectedHour);
        this.selectedMinute = this.getProperTime("00", this.selectedMinute);
        this.selectedMeridiem = this.getProperTime("AM", this.selectedMeridiem);
        //console.log(this.inpValue.length);

        if (this.questionItem.X24_Hours__c === false) {
          this.questionItem.input =
            (this.selectedMeridiem === "PM" && this.selectedHour != "12"
              ? Number(this.selectedHour) + 12
              : this.selectedHour) +
            ":" +
            this.selectedMinute + " PM";
          if (this.selectedMeridiem === "AM" && this.selectedHour === "12") {
            this.questionItem.input = "00" + ":" + this.selectedMinute + " AM";
          }
          if (this.qbItem.Progress_Bar__c) {
            this.inpValue = this.inpValue + " " + this.questionItem.input;
          } else {
            this.inpValue = this.inpValue + "T" + this.questionItem.input;
          }
        }
        if (this.questionItem.X24_Hours__c === true) {
          this.questionItem.input =
            this.selectedHour + ":" + this.selectedMinute;
          if (this.qbItem.Progress_Bar__c) {
            this.inpValue = this.inpValue + " " + this.questionItem.input;
          } else {
            this.inpValue = this.inpValue + "T" + this.questionItem.input;
          }
        }
        if (this.qbItem.Progress_Bar__c) {
          //console.log("ans => " + this.inpValue);
          var date1: any = this.inpValue.split(" ");
          date1 = date1[0].split("/");
          date1 = [date1[2], date1[1], date1[0]].join("-");
          date1 = new Date(date1);
          //console.log(date1)
          var date2: any = this.insuranceStartDate.split(" ");
          date2 = new Date(date2[0]);
          //console.log(date2);
          if (date1 < date2) {
            this.questionItem.error = new ErrorWrapper();
            this.questionItem.error.errorMsg =
              "No es posible dar de alta la reclamación debido a que la fecha del incidente es anterior a la fecha de contratación de la póliza";
            //console.log('inside')
            return;
          }
        }
        if (this.selDate === null || !this.inpValue) {
          this.questionItem.error = new ErrorWrapper();
          return;
        }
        this.date_TimeMap();
      }
    } else if (this.timeFlag && this.dtFlag && !this.dateFlag) {
      this.date_TimeMap();
      if (this.questionItem.X24_Hours__c === false) {
        this.inpValue =
          (this.selectedMeridiem === "PM" && this.selectedHour != "12"
            ? Number(this.selectedHour) + 12
            : this.selectedHour) +
          ":" +
          this.selectedMinute;
      } else {
        this.inpValue = this.selectedHour + ":" + this.selectedMinute;
      }
      if (this.inpValue.length < 5) {
        this.questionItem.error = new ErrorWrapper();
        return;
      }
    } else if (this.dateFlag && this.dtFlag && !this.timeFlag) {
      this.change();
      if (this.inpValue.length < 7 || this.selDate === null) {
        this.questionItem.error = new ErrorWrapper();
        return;
      }
    } else if (this.fileFlag) {
      //console.log('four')
      this.inpValue = "";
      if (this.attachments.length > 0) {
        for (var attachmentItem of this.attachments) {
          this.inpValue +=
            attachmentItem.attachmentId +
            "@#$" +
            attachmentItem.attachmentName +
            ",";
        }
        //console.log('inside filesss' + this.inpValue);
        this.inpValue = this.inpValue.substr(0, this.inpValue.length - 1);
      } else {
        this.questionItem.error = new ErrorWrapper();
        return;
      }
    }
    //console.log('before calling saveAnswer with ' + this.inpValue);

    // Check for the answer before saving to the DB
    if (!this.questionItem.Is_Optional__c && !this.inpValue) {
      // Show error that the question must be answered
      this.questionItem.error = new ErrorWrapper();
      return;
    }
    // Save the Answer in the DB
    this.answerWrap = new AnswerWrapper();
    this.answerWrap.abId = this.abItem.Id;
    this.answerWrap.quesId = cQuestion.Id;
    this.answerWrap.quesValue = quesValue;
    this.answerWrap.qTyp = typ;
    this.answerWrap.ansValue = this.inpValue;
    this.answerWrap.groupText = cQuestion.Group__c;
    //this.answerWrap.squesValue = cQuestion.Question__c;
    this.saveAnswer();
  }

  next() {
    var cQuestion: Question = new Question();
    cQuestion = this.questionItem;
    var typ = cQuestion.Type__c;
    // If no error then move to next steps
    if (this.questionItem.error) {
      return;
    }

    this.questionStack.push(cQuestion.Id);
    //  this.questionName.push(cQuestion.Name);

    // CONDITIONAL vs OPTIONONLY & UNCONDITIONAL
    if (cQuestion.RecordType.Name == "CONDITIONAL") {
      for (var cOpt of cQuestion.Question_Options__r.records) {
        // Radio / Data
        //console.log('Option => ' + cOpt.Value__c + ' matching with ' + ansVal);
        if (cOpt.Value__c == this.inpValue) {
          //console.log('Match Found using ' + cOpt.Next_Question__c);
          this.recordId = cOpt.Next_Question__c;
          //console.log('inside'+ recordId);
        }
      }
      // Could be of type Data and existing value
      if (this.recordId && typ == "Data") {
        this.recordId = cQuestion.Next_Question__c;
      }
    } else if (cQuestion.RecordType.Name == "OPTIONONLY") {
      //  OPTIONONLY logic
      this.recordId = cQuestion.Next_Question__c;
    } else if (cQuestion.RecordType.Name == "UNCONDITIONAL") {
      //Unconditional  logic
      //console.log("inside unconditional");
      //inside Book Type
      if (cQuestion.Type__c == "Book") {
        //console.log("inside book");
        for (let opt of cQuestion.Questions__r.records) {
          //console.log(opt.Type__c);
          if (opt.Type__c == "Dropdown" || opt.Type__c == "Radio") {
            for (var opt1 of opt.Question_Options__r.records) {
              if (this.valueName == opt1.Value__c) {
                this.recordId =
                  opt1.Next_Question__c || cQuestion.Next_Question__c;
              } else {
                //console.log('Else'+this.recordId)
                this.recordId = cQuestion.Next_Question__c;
              }
            }
          } else {
            this.recordId = cQuestion.Next_Question__c;
          }
        }
      } else {
        this.recordId = cQuestion.Next_Question__c;
      }
    }

    // CATEGORIZATION
    //this.stepperCateg();

    // Calling the progres bar update function
    this.answerCount++;
    this.updateProgress();

    // CATEGORIZATION
    //this.stepperCateg();

    if (this.recordId) {
      //console.log('Before Calling readQuestion() using ' + recordId);
      this.readQuestion(this.recordId);
      this.pop = true;
    } else {
      this.pop = false;
      //console.log('Summary Page Logic');
      // Reset the Variables
      this.inpValue = "";
      this.answerWrap = new AnswerWrapper();
      this.optionValues = [];
      this.subQuestions = [];

      this.resetFlag(typ);
      this.questionItem = null;

      // Show Summary
      for (var q of this.questionStack) {
        var ansWrap = this.answerMap.get(q);
        if (ansWrap) {
          //console.log("Handling Answer for " + ansWrap.quesId + " of type " + ansWrap.qTyp);
          var newStr = "";

          for (var ansStr of ansWrap.ansValue.split("@@##$$")) {
            if (ansStr.length > 0) {
              if (newStr.length == 0) {
                newStr = ansStr;
                //for file assignment
                if (this.attachmentsMap.has(ansWrap.quesId)) {
                  for (var att of this.attachmentsMap.get(ansWrap.quesId)) {
                    newStr = newStr.replace(att.attachmentId + "@#$", "");
                  }
                }
              } else {
                newStr += ", " + ansStr;
                //for file assignment
                if (this.attachmentsMap.has(ansWrap.quesId)) {
                  for (var att of this.attachmentsMap.get(ansWrap.quesId)) {
                    newStr = newStr.replace(att.attachmentId + "@#$", "");
                  }
                }
                newStr = newStr.replace(",,", ", ").replace(", ,", ", ");
                newStr = newStr.startsWith(",")
                  ? newStr.substring(1, newStr.length)
                  : newStr.endsWith(",")
                  ? newStr.substring(0, newStr.length - 1)
                  : newStr;
              }
            }
          }
          ansWrap.ansValue = newStr;
          this.summary.push(ansWrap);
        }
      }
    }
  }

  getText(value) {
    var doc = new DOMParser().parseFromString(value, "text/html");
    //console.log( doc.documentElement.textContent);
    return this.sanitizer.bypassSecurityTrustHtml(
      doc.documentElement.textContent
    );
  }

  handleBackClick() {
    this.back = true;
    if (this.pop === true) {
      this.questionName.pop();
    }

    this.handleEvent.emit(this.qbItem.Back_Tracking_ID__c);
    this.answerCount--;
    this.updateProgress();
    // CATEGORIZATION
    //this.stepperCateg();

    if (this.summary) {
      //    console.log('summary true');
      this.summary = [];
    }

    // Read the previous question from DB
    this.readQuestion(this.questionStack.pop());
    //console.log(this.questionStack);
  }

  //updating status once Q&A completed.

  private updateAnswerBook = (uuid: string) =>
    this.sfService.remoteAction(
      "NxtController.process",
      ["AnswerBook", "Update", uuid],
      this.successupdateAB,
      this.failureupdateAB
    );

  private successupdateAB = (response) => {
    //console.log(response);
    // console.log('status success')
    //this.abItem.Status__c = "Completed";
  };
  private failureupdateAB = (response) => {
    //console.log('status failed')
  };

  private readQuestionBook = (uuid: string) =>
    this.sfService.remoteAction(
      "NxtController.process",
      ["QuestionBook", "read", uuid],
      this.successReadBook,
      this.failureReadBook
    );

  private successReadBook = (response) => {
    //console.log(response)
    this.qbItem = response.questionbook;
    this.abItem = response.answerbook;
    //console.log('readingQuestion using ' + this.qbItem.First_Question__c);
    if (this.abItem.Status__c == "Pending") {
      if (
        this.abItem.Answers__r == null ||
        this.abItem.Answers__r.records.length == 0
      ) {
        this.readQuestion(this.qbItem.First_Question__c);
      } else {
        // Populate the existing answers
        var lastQuestionId = "";

        for (var ansObject of this.abItem.Answers__r.records) {
          lastQuestionId = ansObject.Question_Ref__c;
           //console.log("Question: " + ansObject.Question_Rich_Text__c);
           // console.log("Answer: " + ansObject.Answer_Long__c);
            //console.log("grouptext: " + ansObject.Question_Group_Text__c);

          this.questionStack.push(ansObject.Question_Ref__c);

          this.answerMap.set(ansObject.Question_Ref__c, {
            quesValue: ansObject.Question_Rich_Text__c,
            ansValue: ansObject.Answer_Long__c,
            quesId: ansObject.Question_Ref__c,
            qTyp: ansObject.Question_Type__c,
            groupText:ansObject.Question_Group_Text__c,
          });

          //console.log(this.questionStack)
          if (ansObject.Question_Type__c == "Book") {
            var av1 = ansObject.Answer_Long__c.split("@@##$$");
            // console.log("book log");

            //  console.log("bookid" + av1[0]);
            this.attachmentsMap.set(ansObject.Question_Ref__c, [
              { attachmentName: av1[1], attachmentId: av1[0] },
            ]);
            //  console.log(this.attachmentsMap);
          } else if (ansObject.Question_Type__c == "File") {
            //  console.log("inside if");
            var attList;
            var att;
            for (var attVar of ansObject.Answer_Long__c.split(",")) {
              var attIdName = attVar.split("@@##$$");
              att.attachmentName = attIdName[1];
              att.attachmentId = attIdName[0];
              attList.push(att);
            }
            this.attachmentsMap.set(ansObject.Question_Ref__c, attList);
            //  console.log(this.attachmentsMap);
          }
        }

        this.questionStack.pop();
        //console.log(this.answerMap);
        // Read the last answered question
        this.readQuestion(lastQuestionId);
      }
    } else if (this.abItem.Status__c == "Completed") {
      this.handleEvent.emit("Summaryupdated");
      // Temporary Fix for duplicate answers on the summary.
      this.summary = [];
      this.percent = 100;
      this.progressStyle = "100%";

      for (var answer of this.abItem.Answers__r.records) {
        //console.log(answer.Question_Group_Text__c);
        //console.log('repeat');
        //console.log(answer.Question_Rich_Text__c);
        var answers = {};
        if (answer.Question_Type__c == "File") {
          var files = "";
          var fIndex = 0;
          var fileList = answer.Answer_Long__c.split(",");
          for (var fileIdName of fileList) {
            var fileName = fileIdName.split("@#$");
            if (fIndex == 0) {
              files = fileName[1];
            } else {
              files = files + " ," + fileName[1];
            }

            fIndex++;
          }

          answers = {
            groupText:answer.Question_Group_Text__c,
            quesValue: answer.Question_Rich_Text__c,
            ansValue: files,
          };
          this.summary.push(answers);
        } else if (answer.Question_Type__c == "Book") {
          for (var bqAnswerValue of answer.Answer_Long__c.split("@@##$$")) {
            answers = {};
            answers = {
              groupText:answer.Question_Group_Text__c,
              quesValue: answer.Question_Rich_Text__c,
              ansValue: bqAnswerValue,
            };
            this.summary.push(answers);
          }
        } else {
          answers = {
            groupText:answer.Question_Group_Text__c,
            quesValue: answer.Question_Rich_Text__c,
            ansValue: answer.Answer_Long__c,
          };
          this.summary.push(answers);
        }
      }
    }
  };

  private failureReadBook = (response) => {
    //console.log(response);
  };

  private readAnswerbook = (uuid: string) =>
    this.sfService.remoteAction(
      "NxtController.process",
      ["AnswerBook", "read", uuid],
      this.successAnswerBookRead,
      this.failureAnswerBookRead
    );

  private successAnswerBookRead = (response) => {
    if (this.abItem.Status__c == "Completed") {
      for (var answer of this.abItem.Answers__r.records) {
        var av = answer.Answer_Long__c.split("@@##$$");
        var answers = { quesValue: answer.Question_Rich_Text__c, ansValue: av, groupText:answer.Question_Group_Text__c };
        //console.log(answers)
        this.summary.push(answers);
      }
      this.handleEvent.emit("Summaryupdated");
    }
  };

  private failureAnswerBookRead = (response) => {
    //console.log('inside failureread');
    //console.log(response);
  };

  private readQuestion = (uuid: string) =>
    this.sfService.remoteAction(
      "NxtController.process",
      ["Question", "read", uuid],
      this.successRead,
      this.failureRead
    );

  private successRead = (response) => {
    // console.log(response);
    // Reset the Variables

    if (this.questionItem) {
      this.inpValue = "";
      this.answerWrap = new AnswerWrapper();
      this.optionValues = [];
      this.subQuestions = [];
      this.resetFlag(this.questionItem.Type__c);
    }
    this.questionItem = response.question;
    this.currentQuestionId = this.questionItem.Id;
    this.handlePage.emit(this.questionItem.Tracking_ID__c);
    // Handle the subQuestion options
    if (response.sqOptions) {
      //var newRecords = [];
      for (var q of this.questionItem.Questions__r.records) {
        //console.log(q.Name);
        var sq = response.sqOptions[q.Id];
        if (sq) {
          //console.log('found options for subquestion ' + q.Name);
          if (!q.Question_Options__r) {
            q.Question_Options__r = sq.Question_Options__r;
          }
        }
      }
    }
    this.processQuestion();
    this.innerhtml = this.sanitizer.bypassSecurityTrustHtml(
      this.questionItem.Additional_Rich__c
    );
    this.trackId();
  };

  trackId() {
    var qtrackId = this.questionItem.Tracking_ID__c;
    //console.log('trackId-question'+qtrackId);
  }

  private failureRead = (response) => {
    //console.log('inside failureread');
    //console.log(response);
  };

  private saveAnswer = () => {
    // Set the Answer Number based on the Question Stack Length
    if (this.inpValue != ".") {
      this.currentQuestionId = null;
    }
    this.answerWrap.ansNumber = this.questionStack.length + 1;

    this.sfService.remoteAction(
      "NxtController.process",
      ["Answer", "create", JSON.stringify(this.answerWrap)],
      this.successSave,
      this.failureSave
    );
  };
  htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  private successSave = (response) => {
    if (response.status == "success") {
      //this.abItem = response.answerbook;
      this.answerMap.set(response.answer.quesId, response.answer);
    } else {
      this.questionItem.error = new ErrorWrapper();
      this.questionItem.error.errorMsg = response.error.errorMsg;
    }
    this.next();
  };

  private failureSave = (response) => {
    //console.log('inside failureSave');
    //console.log(response);
  };

  private processQuestion = () => {
    this.pop = true;

    // if(!this.back){
    //   this.questionName.push(this.questionItem.Name)
    // }

    if (this.qbItem.Progress_Bar__c === true) {
      if (!this.back) {
        this.questionName.push(this.questionItem.Name);
      }
      this.back = false;
      if (this.questionName[0] === this.questionName[1]) {
        this.questionName.pop();
      }

      this.currentName = this.questionItem.Name;
      this.pathquestion = this.questionName.indexOf(this.currentName);
      this.possibilities = JSON.parse(this.qbItem.Possibilities__c);
    }

    this.myDatePickerOptions;
    this.day();
    //console.log('processing question ' + this.questionItem.Name + ' existing answers are ' + this.answerMap.size); // => ' + JSON.stringify(this.questionItem));

    // Set the Flags to show right fields
    this.setFlag(this.questionItem.Type__c);

    // Check the existing answer from answerMap
    if (this.answerMap.has(this.questionItem.Id)) {
      //  console.log("existing answer found for this.questionItem.Name");
      var eAnswer = this.answerMap.get(this.questionItem.Id);
      // Get the existing answer from the Map
      this.inpValue = eAnswer.ansValue;
      //console.log('inpValue has been set to ' + this.inpValue);
      if (this.attachmentsMap.has(this.questionItem.Id)) {
        this.attachments = this.attachmentsMap.get(this.questionItem.Id);
      }
    } else {
      //console.log('inside removing attachment array');
      this.attachments = [];
    }

    if (this.checkboxFlag) {
      // Set the Options for Checkbox
      this.setOptions(this.questionItem.Question_Options__r.records);
    } else if (this.bookFlag) {
      // Set the SubQuestions
      this.setSubQuestions(this.questionItem.Questions__r.records);
    } else if (this.dtFlag) {
      this.selectedHour = "";
      this.selectedMinute = "";
      this.selDate = "";
      // 2021-5-16T00:00
      if (this.dateMap.has(this.questionItem.Id)) {
        this.selDate = this.dateMap.get(this.questionItem.Id);
      }
      if (this.selectedhourMap.has(this.questionItem.Id)) {
        this.selectedHour = this.selectedhourMap.get(this.questionItem.Id);
      }
      if (this.selectedminuteMap.has(this.questionItem.Id)) {
        this.selectedMinute = this.selectedminuteMap.get(this.questionItem.Id);
      }
      if (this.questionItem.X24_Hours__c === true) {
        this.hours.push(
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "00"
        );
      }
      if (this.questionItem.X24_Hours__c === false) {
        this.hours = this.hours.slice(0, 12);
      }
      if (this.dtFlag && this.inpValue) {
        var dtVal = this.inpValue.split("T"); 
        var dtval0 = this.inpValue.split(" ");
        this.inpValue = dtVal[0];
        this.inpValue = dtval0[0];
        //console.log('inp'+this.inpValue + '=='+dtVal[0])
        //console.log('inp'+this.inpValue + '=='+dtval0[0])

        this.questionItem.input = dtVal[1];
        this.questionItem.input = dtval0[1];
        //console.log('inpvalue'+this.questionItem.input +'==' +dtVal[1])
        //console.log('inpvalue'+this.questionItem.input +'==' +dtval0[1])
      }
      if (
        this.questionItem.Is_Date_Backward__c ||
        this.questionItem.Is_Date_Forward__c
      ) {
        if (this.questionItem.Is_Date_Backward__c === true) {
          this.myDatePickerOptions.disableSince = {
            year: this.today.getFullYear(),
            month: this.today.getMonth() + 1,
            day: this.today.getDate() + 1,
          };
        }
        if (this.questionItem.Is_Date_Forward__c === true) {
          this.myDatePickerOptions.disableUntil = {
            year: this.today.getFullYear(),
            month: this.today.getMonth() + 1,
            day: this.today.getDate(),
          };
        }
      }
    } else if (this.fileFlag) {
      this.fileUI();
      // logic
      this.allowedFileExtension =
        this.questionItem.Allowed_File_Extensions__c.split(";");
      //console.log(this.allowedFileExtension);
    }
    if (this.qbItem.Progress_Bar__c === true) {
      this.updateProgress();
    }
  };

  setFlag(typ) {
    //console.log('inside setFlag for ' + typ);

    if (typ) {
      // Set the Flags
      if (typ == "Text") {
        this.textFlag = true;

        //this.numberFlag = true;
      } else if (typ == "Number") {
        this.numberFlag = true;
      } else if (typ == "Alphanumeric") {
        this.alphanumericFlag = true;
      } else if (typ == "Email") {
        this.emailFlag = true;
      } else if (typ == "File") {
        this.fileFlag = true;
      } else if (typ == "DateTime") {
        this.dtFlag = true;
        this.timeFlag = true;
        this.dateFlag = true;
      } else if (typ == "TextArea") {
        this.taFlag = true;
      } else if (typ == "Radio") {
        this.radioFlag = true;
      } else if (typ == "Dropdown") {
        this.dropdownFlag = true;
      } else if (typ == "Checkbox") {
        this.checkboxFlag = true;
      } else if (typ == "Book") {
        this.bookFlag = true;
      } else if (typ == "Time") {
        this.dtFlag = true;
        this.timeFlag = true;
      } else if (typ == "Date") {
        this.dtFlag = true;
        this.dateFlag = true;
      }
    }
  }

  resetFlag(typ) {
    if (typ) {
      // Set the Flags
      if (typ == "Text") {
        this.textFlag = false;
        //this.numberFlag = false;
      } else if (typ == "Number") {
        this.numberFlag = false;
      } else if (typ == "Alphanumeric") {
        this.alphanumericFlag = false;
      } else if (typ == "Email") {
        this.emailFlag = false;
      } else if (typ == "File") {
        this.fileFlag = false;
      } else if (typ == "DateTime") {
        this.dtFlag = false;
        this.dateFlag = false;
        this.timeFlag = false;
      } else if (typ == "TextArea") {
        this.taFlag = false;
      } else if (typ == "Radio") {
        this.radioFlag = false;
      } else if (typ == "Dropdown") {
        this.dropdownFlag = false;
      } else if (typ == "Checkbox") {
        this.checkboxFlag = false;
      } else if (typ == "Book") {
        this.bookFlag = false;
      } else if (typ == "Time") {
        this.dtFlag = false;
        this.timeFlag = false;
      } else if (typ == "Date") {
        this.dtFlag = false;
        this.dateFlag = false;
      }
    }
  }

  setOptions(records) {
    for (var opt of records) {
      var ov = new OptionValue();
      ov.Id = opt.Id;
      ov.Name = opt.Name;
      ov.Value__c = opt.Value__c;
      ov.Next_Question__c = opt.Next_Question__c;
      ov.checked = false;

      if (
        this.inpValue &&
        this.inpValue.split("@@##$$").includes(opt.Value__c)
      ) {
        ov.checked = true;
      }

      this.optionValues.push(ov);
    }
  }
  //Dropdown quesId == inpId
  Dropdown(event) {
    //console.log(event.target.value);
    this.valueName = event.target.value;
  }

  setSubQuestions(records) {
    //console.log('inside setSubQuestions');

    var qaMap = new Map();
    if (this.inpValue) {
      var aIndex = 0;
      if (this.inpValue.search(", ") == -1) {
        for (var ansStr of this.inpValue.split("@@##$$")) {
          aIndex++;
          qaMap.set(aIndex, ansStr);
          //console.log('Setting the qaMap for ' + aIndex + ' with ' + ansStr);
        }
      } else {
        for (var ansStr of this.inpValue.split(", ")) {
          aIndex++;
          qaMap.set(aIndex, ansStr);
          //console.log('Setting the qaMap ' + aIndex + ' with ' + ansStr);
        }
      }
    }

    for (var ques of records) {
      var sQues = new Question();
      sQues.Id = ques.Id;
      sQues.Name = ques.Name;
      sQues.Question__c = ques.Question__c;
      sQues.Error_Message__c = ques.Error_Message__c;
      sQues.Type__c = ques.Type__c;
      sQues.Next_Question__c = ques.Next_Question__c;
      sQues.Is_Optional__c = ques.Is_Optional__c;
      sQues.Group__c = ques.Group__c;
      sQues.Question_No__c = ques.Question_No__c;
      sQues.Allowed_File_Extensions__c = ques.Allowed_File_Extensions__c;
      if (ques.Type__c == "File") {
        this.valueName1 = ques.Allowed_File_Extensions__c;
        //console.log(this.valueName1);
      }

      if (qaMap.has(ques.Question_No__c)) {
        //console.log('Setting input for the subQuestion ' + ques.Question_No__c + ' with ' + ansStr);
        if (ques.Type__c != "File") {
          ques.input = qaMap.get(ques.Question_No__c);
        }
      }

      this.subQuestions.push(ques);
    }
    if (this.valueName1.length > 0) {
      this.bookFlagAccept = this.valueName1.split(";");
      //console.log(this.subQuestions);
    }
  }

  optionChange(selValue) {
    let radioTrackingId: string = "";
    for (var opt of this.questionItem.Question_Options__r.records) {
      //console.log('optionChange TrackingId'+opt.Tracking_ID__c);
      if (opt.Value__c == selValue) {
        //console.log('inside if'+opt.Tracking_ID__c)
        radioTrackingId = opt.Tracking_ID__c;
      }
    }

    this.handleEvent.emit(radioTrackingId);
    this.clearError();
    // console.log('inside optionChange using ' + selValue);

    this.inpValue = selValue;
  }

  clearError() {
    if (this.questionItem.error) {
      this.questionItem.error = null;
    }
  }

  CCOnChange(inpValue: string) {
    //console.log("Inside calling CCOnChange");
    //console.log("inpValue = " + inpValue);
    inpValue = inpValue.replace(/\s+/g, "");
    if (inpValue.length > 0) {
      //console.log("inpValue.length = " + inpValue.length);
      if (inpValue.length % 4 == 0 && inpValue.length < 24) {
        this.inpValue += " ";
      }
    }
  }

  isNotValidAccNumber(s: string) {
    s = s.replace(/\s+/g, "");
    var isNotValidStr = false;
    if (s.length == 24) {
      for (var i = 0; i < s.length; i++) {
        if (i <= 1 && /[a-zA-Z]/.test(s.charAt(i))) {
          //console.log("Valid char: " + s.charAt(i));
        } else if (i > 1 && /[0-9]/.test(s.charAt(i))) {
          //console.log("Valid numeric: " + s.charAt(i));
        } else {
          isNotValidStr = true;
          //console.log("Not a valid char");
        }
      }
    } else {
      isNotValidStr = true;
      //console.log("Not a valid acc number");
    }
    return isNotValidStr;
  }

  clearSQError(quesId) {
    var sqList = this.subQuestions.filter((item) => item.Id == quesId);
    for (var sq of sqList) {
      sq.error = null;
    }
  }

  uploadFile(event) {
    //console.log('inside upload');
    this.clearError();
    this.fileTypeIncorrect = false;
    var local = this;
    local.attachment = event.target.files[0];
    // Validate the file extension
    //console.log(local.attachment);
    let fileNameWithType: string =
      local.attachment && local.attachment.name.toLowerCase();
    if (
      !fileNameWithType.endsWith(".jpg") &&
      !fileNameWithType.endsWith(".png") &&
      !fileNameWithType.endsWith(".pdf") &&
      !fileNameWithType.endsWith(".jpeg") &&
      !fileNameWithType.endsWith(".heic") &&
      !fileNameWithType.endsWith(".heif") &&
      !fileNameWithType.endsWith(".JPG") &&
      !fileNameWithType.endsWith(".PNG") &&
      !fileNameWithType.endsWith(".PDF") &&
      !fileNameWithType.endsWith(".JPEG") &&
      !fileNameWithType.endsWith(".HEIC") &&
      !fileNameWithType.endsWith(".HEIF")
    ) {
      local.fileTypeIncorrect = true;
    }
    // Return when the file type is incorrect
    if (local.fileTypeIncorrect) {
      return;
    }
    let fileContent: any;
    var reader = new FileReader();

    reader.onload = function () {
      fileContent = reader.result;
      local.fileExceededLimit = local.attachment.size > 3242880; //Validating file size
      // Upload the file to Salesforce when the limit is within range
      if (!local.fileExceededLimit) {
        let fileWrapper = new AttachmentWrapper();
        fileWrapper.parentId = local.abItem.Id;
        fileWrapper.fileName = local.attachment.name;
        fileWrapper.fileContent = fileContent;
        local.createAttachment(fileWrapper);
      }
    };
    this.spinner.show(this.spinnerName);
    reader.readAsDataURL(event.target.files[0]);
  }

  private successAttachmentCreate = (response) => {
    let createdAttachment: Attachment = new Attachment(
      response.attachmentId,
      response.attachmentName,
      this.attachment.lastModifiedDate
    );
    this.attachments.push(createdAttachment);
    this.attachmentsMap.set(this.questionItem.Id, this.attachments);
    this.spinner.hide(this.spinnerName);
  };

  private successAttachmentDelete = (response) => {
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i].attachmentId === this.attachmentId) {
        this.attachments.splice(i, 1);
      }
    }
  };

  private failureAttachmentCreate = (response) => {
    //console.log('inside failureAttachmentCreate');
  };

  private failureAttachmentDelete = (response) => {
    //console.log('inside failureAttachmentDelete');
  };

  handleSubmitClick() {
    this.handleEvent.emit(this.qbItem.Submit_Tracking_ID__c);
    this.updateAnswerBook(this.abItem.Id);
  }

  handleCancelClick() {
    this.handleEvent.emit(this.qbItem.Cancel_Tracking_ID__c);
  }

  private createAttachment = (fileWrapper: any) =>
    this.sfService.remoteAction(
      "NxtController.process",
      ["Attachment", "create", JSON.stringify(fileWrapper)],
      this.successAttachmentCreate,
      this.failureAttachmentCreate
    );

  deleteAttachment(attachmentId: string) {
    this.attachmentId = attachmentId;
    this.handleEvent.emit("deleteAttachment");
    this.deleteSFAttachment(attachmentId);
  }

  private deleteSFAttachment = (fileId: string) =>
    this.sfService.remoteAction(
      "NxtController.process",
      ["Attachment", "delete", fileId],
      this.successAttachmentDelete,
      this.failureAttachmentDelete
    );

  getFileName(fileNamewithIdandType) {
    //truncate file path
    var fileNameWithType = fileNamewithIdandType.substr(
      fileNamewithIdandType.indexOf("::::") + 4
    );
    return fileNameWithType; //fileNameWithType.replace(/^(.*(\/|\\))(.+)$/, '$3');
  }
  fileUI() {
    if (this.attachments.length === 0) {
    }
  }

  //Update function for categorization
  // stepperCateg() {
  //   this.firstFormGroup = this._formBuilder.group({
  //     firstCtrl: ['', Validators.required]
  //   });
  //   this.secondFormGroup = this._formBuilder.group({
  //     secondCtrl: ['', Validators.required]
  //   });

  // }

  // Update Function for the Progress Bar
  updateProgress() {
    if (this.qbItem.Progress_Bar__c === true) {
      let j = [];
      for (let i = 0; i < this.possibilities.total; i++) {
        var pathposs = Object.values(this.possibilities.paths[i].questions);
        if (pathposs[this.pathquestion] === this.currentName) {
          j.push(i);
          this.check = true;
        } else {
          this.check = false;
        }
      }
      if (j.length === 1) {
        this.count = j[0];
      }
      if (j.length > 1) {
        var width =
          90 * (this.questionStack.length / this.possibilities.maxQuestions);
        this.progressStyle = Math.round(width) + "%";
      } else if (j.length === 1) {
        var width =
          90 *
          (this.questionStack.length /
            this.possibilities.paths[this.count].count);
        this.progressStyle = Math.round(width) + "%";
      }
      this.percent = +Math.round(width);
    }
  }

  townName(area) {
    this.selectedValue = area.town;
    console.log('this value='+this.selectedValue)
    this.tempoAddress = [];
  }

  getTownLocal() {
    this.tempoAddress = [];
    if (this.selectedValue.length > 0) {
      for (var val of this.localaddress) {
        //for (var val of this.sampleAddress) {
          //console.log('this value1='+val)
        if (
          val.town.substring(0, this.selectedValue.length) == this.selectedValue
        ) {
          //console.log(val.country)
          this.tempoAddress.push(val);
          //console.log('tempoAddress'+this.tempoAddress)
          if (this.tempoAddress.length == 6) {
            break;
          }
        }
      }
    }
    document.getElementById("selectList").style.display = "block";
    this.setSearchListWidth();
  }

  clearList() {
    setTimeout(() => {
      this.tempoAddress = [];
    }, 500);
  }

  setSearchListWidth() {
    //to resize search list based on the screen size
    const searchBoxWidth = window.document.getElementById("autocomplete-input").offsetWidth;
    document.getElementById("selectList").style.width = searchBoxWidth + "px";
  }

    getCode(){
      this.tempoAddress = [];
      if (this.selectedPostalcode.length > 0) {
        for (var val of this.allAddress) {
          //for (var val of this.sampleAddress) {
            //console.log('this value1='+val)
          if (val.zipCode.substring(0, this.selectedPostalcode.length) == this.selectedPostalcode) {
            //console.log(val.country)
            this.tempoAddress.push(val);
            //console.log('tempoAddress'+this.tempoAddress)
            if (this.tempoAddress.length == 6) {
              break;
            }
          }
        }
      }
      document.getElementById("selectList").style.display = "block";
      this.setSearchListWidth();
    }
    getPostalcode(value){
     this.places=[];
     this.province=[];
      var province;
      var town;
      this.selectedPostalcode = value.zipCode;
      this.selectedValue = value.country;
      this.tempoAddress=[];

 /* console.log('this post****='+town+ '=='+this.selectedCity)
      console.log('this val*****='+province+'=='+this.selectedProvince)
      console.log('this country****='+this.selectedValue)*/
      for(var val of this.localaddress){
        if(this.selectedPostalcode == val.zipCode ){
          console.log('this post='+this.selectedPostalcode)
          console.log('this val='+this.selectedProvince)
          this.places.push(val);
          this.province.push(val);
          this.selectedValue = val.country;
          console.log('this country*****='+val.country+'=='+this.selectedValue)
          province = val.province
          town = val.town;
          console.log('this post123='+town+ '=='+this.selectedCity)
          console.log('this val123='+province+'=='+this.selectedProvince)
        }
      }
      if(this.places.length == 1){
        
        this.selectedProvince =province;
        this.selectedCity = town;
        console.log('******+'+this.selectedProvince)
        console.log('******+'+this.selectedCity)
      }else if(this.places.length >1 || this.places.length ==0){
        
          this.selectedCity ='';
          this.selectedProvince='';
          console.log('******else+  '+this.selectedProvince)
        console.log('******else+   '+this.selectedCity)
      }
    }
    closeDropdown() {
      if(this.selectedPostalcode.length == 5){
        this.getPostalcode({zipCode:this.selectedPostalcode});
      }

   setTimeout(()=> {
      document.getElementById('selectList').style.display = "none";
    }, 500);
   }
  }
