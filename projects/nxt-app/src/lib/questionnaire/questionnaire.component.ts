import { Component, OnInit, OnChanges, Input, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SalesforceService } from '../services/salesforce.service';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {FormBuilder } from '@angular/forms';

import { Question,
         QuestionBook,
         AnswerBook,
         AnswerWrapper,
         ErrorWrapper,
         Option,
         OptionValue, 
         AttachmentWrapper,
         Attachment } from '../wrapper';

import { TESTQUESTION,
         DTQUESTION,
         FILEQUESTION,
         TAQUESTION,
         RADIOQUESTION,
         CHECKQUESTION,
         BOOKQUESTION,
         TESTQB} from '../sample';

@Component({
  selector: 'lib-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})

export class QuestionnaireComponent implements OnInit {
  @Input() qbId: string;
  @Output() backToObjects = new EventEmitter();
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
  public fileFlag: boolean = false;
  public bookFlag: boolean = false;
  public optionValues: OptionValue[] = [];
  public subQuestions: Question[] = [];
  public inpValue: string;
  public answerMap = new Map();
  public sqOptions = new Map();
  public questionStack = [];
  public attachments: any [] = [];
  public attachmentIdList: any [] = [];
  public attachmentId: string = '';
  public attachment: any;
  public allowed:any;
  public fileContents: any;
  public fileExceededLimit: boolean = false;
  public fileTypeIncorrect: boolean = false;
  public localDate:string;
  public taFocusOut: boolean = false;
  public summary = [];
  public selDate: any = {};
  private today: Date = new Date();
  private el: HTMLElement;
  public innerhtml:any;
  public hours: string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  public minutes: string[] = ['00','01','02','03','04','05','06','07','08','09','10',
                                   '11','12','13','14','15','16','17','18','19','20',
                                   '21','22','23','24','25','26','27','28','29','30',
                                   '31','32','33','34','35','36','37','38','39','40',
                                   '41','42','43','44','45','46','47','48','49','50',
                                   '51','52','53','54','55','56','57','58','59'];
  public selectedHour: string = '';
  public selectedMinute: string = '';
  public selectedMeridiem: string = '';

  // REQ-01 PROGRESS BAR
  public progressStyle: string = '0%';
  public answerCount: number = 0;


  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    sunHighlight: false,
    disableDateRanges: [],
    showClearDateBtn: false,
    disableSince: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate() + 1
    },
    showTodayBtn: false,
    dayLabels: { su: 'So', mo: 'Mo', tu: 'Di', we: 'Mi', th: 'Do', fr: 'Fr', sa: 'Sa' },
    monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mär', 4: 'Apr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Okt', 11: 'Nov', 12: 'Dez' }
  };

  constructor(private sfService: SalesforceService, private route: ActivatedRoute ,private sanitizer: DomSanitizer,private _formBuilder: FormBuilder) {

  }

  onDateChanged(event: IMyDateModel) { //to change the border color
    this.inpValue = event.date.year + '-' + event.date.month + '-' + event.date.day;
    const htmlElement = window.document.getElementsByClassName('mydp');
    htmlElement.item(0).setAttribute('style', 'border-color:#87be1c;width:100%');
  }

  ngOnInit() {
    //console.log('inside Questionnaire ngOnInit');
    this.selectedHour = "";
    this.selectedMinute = "";
    this.selectedMeridiem = "AM";
    this.processQB();

  }

  ngOnChanges() {
    //console.log('inside Questionnaire ngOnChanges');
    this.processQB();
  }


  processQB() {
    //console.log(this.qbId);
    if(this.qbId) {
      if(this.qbId.length == 18) {
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



  trimLastDummy(input: string){
    return input = input.substring(0,input.length-6);
  }


  getProperTime(def:string,input:string){
    return input === '' ? def : input;
  }

  handleNextClick() {
    this.clearError();
    var recordId = null;
    var cQuestion: Question = new Question();
    cQuestion = this.questionItem;
    var typ = cQuestion.Type__c;
    var quesValue = cQuestion.Question__c;

    // Process Inputs
    if(this.checkboxFlag) {
      this.inpValue = '';
      // Save all the selected options in the inpValue
      for(var ov of this.optionValues.filter(item => item.checked)) {
        this.inpValue += ov.Value__c + '@@##$$';
        recordId = ov.Next_Question__c;
      }
      this.inpValue = this.trimLastDummy(this.inpValue);
    } else if(this.bookFlag) {
      //quesValue += '@@##$$';
      this.inpValue = '';
      var hasMissingInput = false;
      for(var item of this.questionItem.Questions__r.records) {
        if(!item.Is_Optional__c && !item.input) {
          item.error = new ErrorWrapper();
          hasMissingInput = true;
        }
        this.inpValue += (item.input != undefined ? item.input : '') + '@@##$$';
      }
      if(hasMissingInput) { return; }
      this.inpValue = this.trimLastDummy(this.inpValue);
    } else if(this.dtFlag && this.inpValue) {
      this.selectedHour = this.getProperTime('12',this.selectedHour);
      this.selectedMinute = this.getProperTime('00',this.selectedMinute);
      this.selectedMeridiem = this.getProperTime('AM',this.selectedMeridiem);
      this.inpValue = this.inpValue + 'T' + (this.selectedMeridiem === 'PM' && this.selectedHour != '12' ? (Number(this.selectedHour)+12) : this.selectedHour ) + ':' + this.selectedMinute + this.selectedMeridiem;
    } else if(this.fileFlag){
      this.inpValue = '';
      if(this.attachments.length > 0) {
        for(var attachmentItem of this.attachments){
          this.inpValue += attachmentItem.attachmentId + '@@##$$' +attachmentItem.attachmentName + ',';
        }
        this.inpValue = this.inpValue.substr(0,this.inpValue.length-1);
      } else {
        this.questionItem.error = new ErrorWrapper();
        return;
      }
    }

    //console.log('before calling saveAnswer with ' + this.inpValue);

    // Check for the answer before saving to the DB
    if(!this.questionItem.Is_Optional__c && !this.inpValue) {
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

    this.saveAnswer();

    // If no error then move to next steps
    if(this.questionItem.error) { return; }

    this.questionStack.push(cQuestion.Id);

    // CONDITIONAL vs OPTIONONLY & UNCONDITIONAL
    if(cQuestion.RecordType.Name == 'CONDITIONAL') {
      for(var cOpt of cQuestion.Question_Options__r.records) {
        // Radio / Data
        //console.log('Option => ' + cOpt.Value__c + ' matching with ' + ansVal);
        if(cOpt.Value__c == this.inpValue) {
          //console.log('Match Found using ' + cOpt.Next_Question__c);
          recordId = cOpt.Next_Question__c;
        }
      }

      // Could be of type Data and existing value
      if(recordId && (typ == 'Data')) {
        recordId = cQuestion.Next_Question__c;
      }
    } else {
      recordId = cQuestion.Next_Question__c;
    }

    // CATEGORIZATION
    //this.stepperCateg();

    // Calling the progres bar update function
    this.answerCount++;
    this.updateProgress();

    // CATEGORIZATION
    //this.stepperCateg();

    if(recordId) {
      //console.log('Before Calling readQuestion() using ' + recordId);
      this.readQuestion(recordId);
    } else {
      //console.log('Summary Page Logic');
      // Reset the Variables
      this.inpValue = '';
      this.answerWrap = new AnswerWrapper();
      this.optionValues = [];
      this.subQuestions = [];
      this.resetFlag(typ);
      this.questionItem = null;

      // Show Summary
      for(var q of this.questionStack) {
        //console.log('Handling Question => ' + q);

        var ansWrap = this.answerMap.get(q);
        if(ansWrap) {
          //console.log('Handling Answer for ' + ansWrap.quesId + ' of type ' + ansWrap.qTyp);
          if( ansWrap.qTyp == 'Book') {
            var newStr = '';
            for(var ansStr of ansWrap.ansValue.split('@@##$$')) {
              if(ansStr.length > 0){
                if(newStr.length == 0) {
                  newStr = ansStr;
                } else {
                  newStr += ', ' + ansStr;
                }
              }
            }
            ansWrap.ansValue = newStr;
          } else if(ansWrap.qTyp == 'File'){
            let attachmentNameArray = [];
            for (var attch of this.attachments){
              attachmentNameArray.push(attch.attachmentName);
            }
            let finalFileListString = (attachmentNameArray.toString()).replace(',',', ');
            ansWrap.ansValue = finalFileListString;
          }
          this.summary.push(ansWrap);
        }
      }

      // Show Thank you Note
    }
  }

  handleBackClick() {
    this.answerCount--;
    this.updateProgress();

    // CATEGORIZATION
    //this.stepperCateg();

    if(this.summary) {
      this.summary = [];
    }

    // Read the previous question from DB
    this.readQuestion(this.questionStack.pop());
  }

  private readQuestionBook = (uuid: string) => this.sfService.remoteAction('NxtController.process',
    ['QuestionBook', 'read', uuid],
    this.successReadBook,
    this.failureReadBook);

  private successReadBook = (response) => {
    //console.log(response);
    this.qbItem = response.questionbook;
    this.abItem = response.answerbook;

    //console.log('readingQuestion using ' + this.qbItem.First_Question__c);
    this.readQuestion(this.qbItem.First_Question__c);
  }

  private failureReadBook = (response) => {

  }

  private readQuestion = (uuid: string) => this.sfService.remoteAction('NxtController.process',
    ['Question', 'read', uuid],
    this.successRead,
    this.failureRead);

  private successRead = (response) => {
    console.log(response);
    // Reset the Variables
    if(this.questionItem)   {
      this.inpValue = '';
      this.answerWrap = new AnswerWrapper();
      this.optionValues = [];
      this.subQuestions = [];
      this.resetFlag(this.questionItem.Type__c);
    }
    this.questionItem = response.question;
    // Handle the subQuestion options
    if(response.sqOptions) {
      //var newRecords = [];
      for(var q of this.questionItem.Questions__r.records) {
        //console.log(q.Name);
        var sq = response.sqOptions[q.Id];
        if(sq) {
          //console.log('found options for subquestion ' + q.Name);
          if(!q.Question_Options__r) {
            q.Question_Options__r = sq.Question_Options__r;
          }
        }
      }
    }

    this.processQuestion();
    this.innerhtml=this.sanitizer.bypassSecurityTrustHtml(this.questionItem.Additional_Rich__c);
  }

  private failureRead = (response) => {
    //console.log('inside failureread');
    //console.log(response);
  }

  private saveAnswer = () => {
    // Set the Answer Number based on the Question Stack Length
    this.answerWrap.ansNumber = this.questionStack.length + 1;

    this.sfService.remoteAction('NxtController.process',
        ['Answer', 'create', JSON.stringify(this.answerWrap)],
        this.successSave,
        this.failureSave);
  }

  private successSave = (response) => {
    //console.log('size',this.answerMap.size);
    //console.log('inside successSave');
    //console.log(response);
    if(response.status == 'success') {
      //this.abItem = response.answerbook;
      this.answerMap.set(response.answer.quesId, response.answer);
    } else {
      this.questionItem.error = new ErrorWrapper();
      this.questionItem.error.errorMsg = response.error.errorMsg;
    }
  }

  private failureSave = (response) => {
    //console.log('inside failureSave');
    //console.log(response);
  }

  private processQuestion = () => {
    //console.log('processing question ' + this.questionItem.Name + ' existing answers are ' + this.answerMap.size); // => ' + JSON.stringify(this.questionItem));

    // Set the Flags to show right fields
    this.setFlag(this.questionItem.Type__c);

    // Check the existing answer from answerMap
    if(this.answerMap.has(this.questionItem.Id)) {
      //console.log('existing answer found for this.questionItem.Name');
      var eAnswer = this.answerMap.get(this.questionItem.Id);
      // Get the existing answer from the Map
      this.inpValue = eAnswer.ansValue;
      //console.log('inpValue has been set to ' + this.inpValue);
    }

    if(this.checkboxFlag) {
      // Set the Options for Checkbox
      this.setOptions(this.questionItem.Question_Options__r.records);
    } else if(this.bookFlag) {
      // Set the SubQuestions
      this.setSubQuestions(this.questionItem.Questions__r.records);
    } else if(this.dtFlag && this.inpValue) {
      // Set the Date and Time
      var dtVal = this.inpValue.split('T');
      this.inpValue = dtVal[0];
      this.questionItem.input = dtVal[1];
    } else if(this.fileFlag){
      console.log(this.questionItem);
      // logic
      this.allowed = this.inpValue.split(';');
      
    }
  }

  setFlag(typ) {
    //console.log('inside setFlag for ' + typ);

    if(typ) {
      // Set the Flags
      if(typ == 'Text') {
        this.textFlag = true;
      } else if(typ == 'File') {
        this.fileFlag = true;
      } else if(typ == 'DateTime') {
        this.dtFlag = true;
      } else if(typ == 'TextArea') {
        this.taFlag = true;
      } else if(typ == 'Radio') {
        this.radioFlag = true;
      } else if(typ == 'Dropdown') {
        this.dropdownFlag = true;
      } else if(typ == 'Checkbox') {
        this.checkboxFlag = true;
      } else if(typ == 'Book') {
        this.bookFlag = true;
      }
    }
  }

  resetFlag(typ) {
    if(typ) {
      // Set the Flags
      if(typ == 'Text') {
        this.textFlag = false;
      } else if(typ == 'File') {
        this.fileFlag = false;
      } else if(typ == 'DateTime') {
        this.dtFlag = false;
      } else if(typ == 'TextArea') {
        this.taFlag = false;
      } else if(typ == 'Radio') {
        this.radioFlag = false;
      } else if(typ == 'Dropdown') {
        this.dropdownFlag = false;
      } else if(typ == 'Checkbox') {
        this.checkboxFlag = false;
      } else if(typ == 'Book') {
        this.bookFlag = false;
      }
    }
  }

  setOptions(records) {
    // console.log('inside setOptions');

    for(var opt of records) {
      // console.log('adding option ' + JSON.stringify(opt));

      var ov = new OptionValue();
      ov.Id = opt.Id;
      ov.Name = opt.Name;
      ov.Value__c = opt.Value__c;
      ov.Next_Question__c = opt.Next_Question__c;
      ov.checked = false;

      if(this.inpValue && this.inpValue.split('@@##$$').includes(opt.Value__c)) {
        ov.checked = true;
      }

      this.optionValues.push(ov);
    }
  }

  setSubQuestions(records) {
    //console.log('inside setSubQuestions');

    var qaMap = new Map();
    if(this.inpValue) {
      var aIndex = 0;
      if(this.inpValue.search(', ') == -1){
        for(var ansStr of this.inpValue.split('@@##$$')) {
          aIndex++;
          qaMap.set(aIndex, ansStr);
          //console.log('Setting the qaMap for ' + aIndex + ' with ' + ansStr);
        }
      } else {
          for(var ansStr of this.inpValue.split(', ')) {
            aIndex++;
            qaMap.set(aIndex, ansStr);
            //console.log('Setting the qaMap ' + aIndex + ' with ' + ansStr);
          }
      }
    }

    for(var ques of records) {
      var sQues = new Question();
      sQues.Id = ques.Id;
      sQues.Name = ques.Name;
      sQues.Question__c = ques.Question__c;
      sQues.Type__c = ques.Type__c;
      sQues.Next_Question__c = ques.Next_Question__c;
      sQues.Is_Optional__c = ques.Is_Optional__c;
      sQues.Group__c = ques.Group__c;
      sQues.Question_No__c = ques.Question_No__c;

      if(qaMap.has(ques.Question_No__c)) {
        //console.log('Setting input for the subQuestion ' + ques.Question_No__c + ' with ' + ansStr);
        ques.input = qaMap.get(ques.Question_No__c);
      }

      this.subQuestions.push(ques);
    }
    //console.log(this.subQuestions);
  }

  optionChange(selValue) {
    this.clearError();
    // console.log('inside optionChange using ' + selValue);
    this.inpValue = selValue;
  }

  clearError() {
    if(this.questionItem.error) {
      this.questionItem.error = null;
    }
  }

  clearSQError(quesId) {
    var sqList = this.subQuestions.filter(item => item.Id == quesId);
    for(var sq of sqList){
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
    let fileNameWithType: string = local.attachment && local.attachment.name.toLowerCase();
    if (!fileNameWithType.endsWith('.jpg') && !fileNameWithType.endsWith('.png') && !fileNameWithType.endsWith('.pdf') && !fileNameWithType.endsWith('.jpeg') && !fileNameWithType.endsWith('.heic') && !fileNameWithType.endsWith('.heif') &&
        !fileNameWithType.endsWith('.JPG') && !fileNameWithType.endsWith('.PNG') && !fileNameWithType.endsWith('.PDF') && !fileNameWithType.endsWith('.JPEG') && !fileNameWithType.endsWith('.HEIC') && !fileNameWithType.endsWith('.HEIF')) {
      local.fileTypeIncorrect = true;
    }
    // Return when the file type is incorrect
    if (local.fileTypeIncorrect) { return; }
    let fileContent: any;
    var reader = new FileReader();
    reader.onload = function() {
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
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  private successAttachmentCreate = (response) => {
    let createdAttachment: Attachment = new Attachment(response.attachmentId,response.attachmentName,this.attachment.lastModifiedDate);
    this.attachments.push(createdAttachment);
  }


  private successAttachmentDelete = (response) => {
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i].attachmentId === this.attachmentId) {
        this.attachments.splice(i, 1);
      }
    }
  }
  
  private failureAttachmentCreate = (response) => {
    //console.log('inside failureAttachmentCreate');
  }
  
  private failureAttachmentDelete = (response) => {
    //console.log('inside failureAttachmentDelete');
  }
  
  handleSubmitClick() {
    this.backToObjects.emit(true);
  }

  private createAttachment = (fileWrapper: any) => this.sfService.remoteAction('NxtController.process',
    ['Attachment', 'create', JSON.stringify(fileWrapper)],
    this.successAttachmentCreate,
    this.failureAttachmentCreate);

  deleteAttachment(attachmentId: string) {
    this.attachmentId = attachmentId;
    this.deleteSFAttachment(attachmentId);
  }

  private deleteSFAttachment = (fileId: string) => this.sfService.remoteAction('NxtController.process',
    ['Attachment', 'delete', fileId],
    this.successAttachmentDelete,
    this.failureAttachmentDelete);

  getFileName(fileNamewithIdandType) {  //truncate file path
    var fileNameWithType = fileNamewithIdandType.substr(fileNamewithIdandType.indexOf('::::') + 4);
    return fileNameWithType; //fileNameWithType.replace(/^(.*(\/|\\))(.+)$/, '$3');
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
    var width = 100 * (this.answerCount / this.qbItem.Total_Questions__c) ;
    //console.log('Progress bar width => ' + width);
    this.progressStyle =  Math.round(width) + '%';
    //$('#progress #bar').animate({'width':width + '%'});
  }


}

