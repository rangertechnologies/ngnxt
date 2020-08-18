import { Question, QuestionBook, AnswerBook } from '../app/wrapper';

/*
export const TESTQUESTIONS: Question[] = [
  { Id: 11, Name: '001', question: 'What is your Name?' },
  { Id: 12, Name: '002', question: 'What is your favourite City?' },
  { Id: 13, Name: '003', question: 'How many languages you speak?' },
  { Id: 14, Name: '004', question: 'Share your feedback?' },
];
*/

export const TESTQUESTIONS: Question[] = [
  { Id: '11',
    Name: 'QN-00003',
    RNXT__Type__c: 'Text',
    RNXT__Question__c: 'What is your Name?',
    RNXT__Next_Question__c: 'a013t000013SS89AAG',
    RNXT__Is_Optional__c: false,
    RNXT__Group__c: 'Basic',
    RNXT__Question_No__c: '1',
    RecordType: {
      Id: 'UNCONDITIONAL',
      Name: '0123t000000VJ94AAG'
    }
  },
  { Id: '12',
    Name: 'QN-00004',
    RNXT__Type__c: 'TextArea',
    RNXT__Question__c: 'Share your feedback?',
    RNXT__Next_Question__c: 'a013t000013SS89AAG',
    RNXT__Is_Optional__c: false,
    RNXT__Group__c: 'Basic',
    RNXT__Question_No__c: '1',
    RecordType: {
      Id: 'UNCONDITIONAL',
      Name: '0123t000000VJ94AAG'
    }
  }
];

