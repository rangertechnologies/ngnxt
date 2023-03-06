export class QuestionBook {
  Id: number;
  Name: string;
  RFAB__Category__c: string;
  RFAB__Next__c : string;
  RFAB__Cancel__c : string;
  RFAB__Back__c : string;
  RFAB__Submit__c : string;
  RFAB__Edit__c : string;
  RFAB__First_Question__c: string;
  RFAB__Title__c: string;
  RFAB__Next_Tracking_ID__c: string;
  RFAB__Back_Tracking_ID__c: string;
  RFAB__Cancel_Tracking_ID__c: string;
  RFAB__Submit_Tracking_ID__c: string;
  RFAB__Total_Questions__c: number;
  RFAB__Summary_Text__c?: string;
  RFAB__Questions__r?: QuestionR;
}

export class Question {
  Id: string;
  Name: string;
  RFAB__Allowed_File_Extensions__c :string;
  RFAB__Question__c : string;
  RFAB__Question_Text__c : string;
  RFAB__Type__c: string;
  RFAB__Next_Question__c?: string;
  RFAB__Is_Optional__c: boolean;
  RFAB__Is_Title__c: boolean;
  RFAB__X24_Hours__c: boolean;
  RFAB__Error_Message__c: string;
  RFAB__Is_Date_Backward__c : boolean;
  RFAB__Is_Date_Forward__c : boolean;
  RFAB__Group__c: string;
  RFAB__Question_No__c?: string;
  RFAB__Question_Options__r?: OptionR;
  RFAB__Size__c: number;
  RFAB__Tracking_ID__c: string;
  RFAB__Additional_Rich__c? : string;
  RFAB__Questions__r?: QuestionR;
  RecordType: {
    Name: string;
  };
  input?: string;
  error?: ErrorWrapper;
  static RFAB__X24_Hours__c: boolean;
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
  RFAB__Value__c: string;
  RFAB__Tracking_ID__c: string;
  RFAB__Next_Question__c?: string;
}

export class OptionValue {
  Id: string;
  Name: string;
  RFAB__Value__c: string;
  RFAB__Next_Question__c?: string;
  checked: boolean;
}

export class AnswerBook {
  Id: string;
  RFAB__Question_Book__c: string;
  RFAB__Status__c: string;
  RFAB__Answers__r?: AnswerR;

}

export class Answer {
  Id: string;
  RFAB__Question_Rich_Text__c: string;
  RFAB__Answer_Long__c : string;
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

