import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-listchild',
  templateUrl: './listchild.component.html',
  styleUrls: ['./listchild.component.css']
})
export class ListchildComponent implements OnInit {

  public showBackButton = true;
  public textType: boolean = false;
  public typeValue: string;
  public answerData = {};
  public questionItem:any;
  public inpValue;
  public keyIndex = 0;
  public itemList: any[] = [{
    id: 0,
    subQuesId:'',
    answerValue:''
  }];
  @Input() questiondata;
  constructor() { }

  ngOnInit(): void {
    console.log('inside child component');
    console.log(this.questiondata);
    this.questionItem = this.questiondata;
    if(this.questiondata.AnsData){
      console.log('inside answerData if')
      console.log(this.answerData)
       // this.answerData. = this.questiondata.AnsData;
    }
    //console.log(this.questiondata)
    var tm = setTimeout(() => {            
        this.setType(this.questionItem.Type__c);
        clearTimeout(tm);
    },1);
  }

  getData(event){
    var response = event.detail;
    //console.log('book chlid ')
    //console.log(response)
    this.answerData = response;
    console.log('List chlid ')
    console.log(this.answerData)
}
setType(typ) {    
    if (typ) {
      // Set the Types
      if (typ == 'Text') {
        this.textType = true;
      }
    }  
}

handleInputChange(event){
  let index = event.target.value;
  console.log('index = '+index);
  this.itemList[index].quesId = this.questionItem.Id;
  this.itemList[index].ansValue = event.target.value;
  
}

addInputBox(){
  this.keyIndex++;
  console.log(this.keyIndex)
  //console.log(this.itemList);
  this.itemList.push({
    id: this.itemList.length +1,
    subQuesId: this.questionItem.Id,
    answerValue: this.inpValue
  });
  console.log(this.itemList);
}

removeAddress(uId: number) {
  if (this.itemList.length >= 2) {
    this.keyIndex--;
  const index = this.itemList.findIndex((item) => item.id === uId);
  this.itemList.splice(index, 1);
  }
  console.log(this.itemList);
}
}
