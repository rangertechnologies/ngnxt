export class QuestionBook {
  Id: number;
  Name: string;
  Category__c: string;
  Next__c : string;
  Cancel__c : string;
  Back__c : string;
  Submit__c : string;
  First_Question__c: string;
  Title__c: string;
 
  Next_Tracking_ID__c: string;
  Back_Tracking_ID__c: string;
  Cancel_Tracking_ID__c: string;
  Submit_Tracking_ID__c: string;
  Total_Questions__c: number;
  Summary_Text__c?: string;
  Questions__r?: QuestionR;
}

export class Question {
  Id: string;
  Name: string;
  Allowed_File_Extensions__c :string;
  Question__c : string;
  Question_Text__c : string;
  Type__c: string;
  Next_Question__c?: string;
  Is_Optional__c: boolean;
  Is_Title__c: boolean;
  X24_Hours__c: boolean;
  Group__c: string;
  Question_No__c?: string;
  Question_Options__r?: OptionR;
  Size__c: number;
  Tracking_ID__c: string;
  Additional_Rich__c? : string;
  Questions__r?: QuestionR;
  RecordType: {
    Name: string;
  };
  input?: string;
  error?: ErrorWrapper;
  static X24_Hours__c: boolean;
}

export class QuestionR {
  records?: Question[];
}

export class OptionR {
  records?: Option[];
}

export class Option {
  Id: string;
  Name: string;
  Value__c: string;
  Tracking_ID__c: string;
  Next_Question__c?: string;
}

export class OptionValue {
  Id: string;
  Name: string;
  Value__c: string;
  Next_Question__c?: string;
  checked: boolean;
}

export class AnswerBook {
  Id: string;
  Question_Book__c: string;
  Status__c: string;
  Answers__r?: AnswerR;
 
}

export class Answer {
  Id: string;
  Question_Rich_Text__c: string;
  Answer_Long__c : string;
}
export class AnswerR {
  records?: Answer[];
}

export class AnswerWrapper {
  ansId?: string;
  ansNumber?: number;
  abId: string;
  quesId: string;
  quesValue: string;
  qTyp: string;
  ansValue: string;
}

export class ErrorWrapper {
  errorCode: string;
  errorMsg: string;
  errorDetails: string;
}

export class AttachmentWrapper {
  parentId: string;
  fileName: string;
  fileContent: string;
}

export class Attachment {
  public attachmentId: string;
  public attachmentName: string;
  public attachmentMetaData: any;

  constructor(id: string,name:string,metaData:any){
      this.attachmentId = id;
      this.attachmentName = name;
      this.attachmentMetaData = metaData;
  }
}

