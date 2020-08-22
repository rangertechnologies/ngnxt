export class QuestionBook {
  Id: number;
  Name: string;
  Category__c: string;
  First_Question__c: string;
  Title__c: string;
  Total_Questions__c: number;
}

export class Question {
  Id: string;
  Name: string;
  Question__c: string;
  Type__c: string;
  Next_Question__c?: string;
  Is_Optional__c: boolean;
  Group__c: string;
  Question_No__c?: string;
  Question_Options__r?: OptionR;
  Questions__r?: QuestionR;
  RecordType: {
    Name: string;
  };
  input?: string;
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
  Answers__r?: [];
}

export class AnswerWrapper {
  abId: string;
  quesId: string;
  quesValue: string;
  qTyp: string;
  ansValue: string;
}
