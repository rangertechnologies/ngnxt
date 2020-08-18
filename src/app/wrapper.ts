export interface Question {
  Id: string;
  Name: string;
  RNXT__Question__c: string;
  RNXT__Type__c: string;
  RNXT__Next_Question__c: string;
  RNXT__Is_Optional__c: boolean;
  RNXT__Group__c: string;
  RNXT__Question_No__c: string;
  RecordType: {};
}

export interface QuestionBook {
  Id: number;
  Name: string;
  RNXT__Category__c: string;
  RNXT__First_Question__c: string;
  RNXT__Title__c: string;
  RNXT__Total_Questions__c: number;
}

export interface AnswerBook {
  Id: number;
  RNXT__Question_Book__c: string;
  RNXT__Status__c: string;
  RNXT__Answers__r: [];
}
