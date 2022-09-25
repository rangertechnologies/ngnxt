import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public answerMap = new Map();
  public answer:string;
  public questionItem:any;
  public questionList = [];
  public labelValue;
  public textValue;
  public data:any;

  @Input() questionItemData;
  @Output() ToQuestionnarie:EventEmitter<any> = new EventEmitter()
  constructor() { }
  
  ngOnInit(): void {
    console.log(this.questionItemData)
    var div = document.createElement("div");
    div.innerHTML = this.questionItemData.Question_Text__c;
    console.log(div.innerHTML);
    if(this.questionItemData.ansData){
      this.answer = this.questionItemData.AnsData;
    }
    this.labelValue = div.innerHTML;
    this.questionItem = this.questionItemData;

    var count = 0;
    for(var val of this.questionItemData.Questions__r.records){
      this.answerMap.set(val.Id,this.answer ? (this.answer.split('$$++'))[count] : null);
        console.log(this.answerMap);
        this.data = JSON.parse(JSON.stringify(val))
        this.data.Question_Text__c = val.Question__c;
        console.log(this.data);
        this.data.answerBookId = this.questionItemData.answerBookId;
        if(this.answer){
          //console.log('values')
            this.data.AnsData = (this.answer.split('$$++'))[count];
        }
        this.questionList = [...this.questionList,this.data]
        console.log(this.questionList);
        count++;
      }
      
    }
    listChildData(event){
      console.log('inside parent event');
      console.log(event);
      
      this.answerMap.set(event.quesId,event.ansValue ? event.ansValue : null)
      console.log('inside this answer in parent')
      console.log(this.answerMap)
      this.shareToHome();
    }

    getData(event){
      var response = event.detail;
      this.answerMap.set(response.quesId,response.ansValue ? response.ansValue : null)
      this.shareToHome();
    }

    shareToHome(){
      var answer = [];
      var nullExist = false;
      this.answerMap.forEach((value,key) => {
        console.log('Mapvalue = '+value)
        console.log('MapKey='+ key)
          if(value){
              answer = [...answer,value ]; 
          }else{
              nullExist = true;
          }
      });
     console.log('answer='+answer)
      let data = {
          quesId:this.questionItemData.Id,
          quesValue:this.questionItemData.Question_Text__c,
          qTyp:this.questionItemData.Type__c,
          ansValue:  answer+'@#$$#@',
          nextQues:this.questionItemData.Next_Question__c
          //ansValue:event.target.value
      };
      console.log(data)
      this.ToQuestionnarie.emit(data);
     console.log('TextValue = '+ this.textValue +'ansval = ' +data.ansValue)
      this.textValue = data.ansValue;
  } 
  }
