import { Question, QuestionBook, AnswerBook } from '../app/wrapper';

/*
export const TESTQUESTIONS: Question[] = [
  { Id: 11, Name: '001', question: 'What is your Name?' },
  { Id: 12, Name: '002', question: 'What is your favourite City?' },
  { Id: 13, Name: '003', question: 'How many languages you speak?' },
  { Id: 14, Name: '004', question: 'Share your feedback?' },
];
*/

// Text Question
export const TESTQUESTION: Question = {
  Id: '11',
  Name: 'QN-00001',
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
};

// DateTime Question
export const DTQUESTION: Question = {
  Id: '12',
  Name: 'QN-00002',
  RNXT__Type__c: 'DateTime',
  RNXT__Question__c: 'When did the incident happen?',
  RNXT__Next_Question__c: 'a013t000013SS89AAG',
  RNXT__Is_Optional__c: false,
  RNXT__Group__c: 'Basic',
  RNXT__Question_No__c: '1',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  }
};

// File Question
export const FILEQUESTION: Question = {
  Id: '12',
  Name: 'QN-00002',
  RNXT__Type__c: 'File',
  RNXT__Question__c: 'Upload the Incident Report/Images?',
  RNXT__Next_Question__c: 'a013t000013SS89AAG',
  RNXT__Is_Optional__c: false,
  RNXT__Group__c: 'Basic',
  RNXT__Question_No__c: '1',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  }
};

// DateTime Question
export const TAQUESTION: Question = {
  Id: '13',
  Name: 'QN-00003',
  RNXT__Type__c: 'TextArea',
  RNXT__Question__c: 'Explain the particulars of the Incident?',
  RNXT__Next_Question__c: 'a013t000013SS89AAG',
  RNXT__Is_Optional__c: false,
  RNXT__Group__c: 'Basic',
  RNXT__Question_No__c: '1',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  }
};
