import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';

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
    subQuesId: '',
    answerValue:''
  }];

  @Input() questiondata;
  @Output() DataList:EventEmitter<any> = new EventEmitter()
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
  var objIndex = this.itemList.findIndex((obj => obj.id == 0));
//Update object's name property.
this.itemList[objIndex].subQuesId = this.questionItem.Id;

// Log object to console again.
// console.log("After update: ", this.itemList[objIndex])
console.log(this.itemList)
var answerList='' ;
for(let i=0; i< this.itemList.length; i++){
 console.log(this.itemList[i].answerValue)
 answerList += this.itemList[i].answerValue +'@#$$#@'; 
}//console.log('answer= '+answerList)
this.inpValue = answerList.substring(0, answerList.length - 6);
console.log(this.inpValue );  
let data = {
  quesId: this.questionItem.Id,
  qTyp: this.questionItem.Type__c,
  ansValue: this.inpValue,
};
this.DataList.emit(data);
}

addInputBox(){
  this.keyIndex++;
  console.log(this.keyIndex)
  //console.log(this.itemList);
  this.itemList.push({
    id: this.keyIndex,
    subQuesId: this.questionItem.Id,
    answerValue: ''
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
