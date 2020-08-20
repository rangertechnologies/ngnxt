import { Question, QuestionBook, AnswerBook } from './wrapper';

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
  Type__c: 'Text',
  Question__c: 'What is your Name?',
  Next_Question__c: 'a013t000013SS89AAG',
  Is_Optional__c: false,
  Group__c: 'Basic',
  Question_No__c: '1',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  },
};

// DateTime Question
export const DTQUESTION: Question = {
  Id: '12',
  Name: 'QN-00002',
  Type__c: 'DateTime',
  Question__c: 'When did the incident happen?',
  Next_Question__c: 'a013t000013SS89AAG',
  Is_Optional__c: false,
  Group__c: 'Basic',
  Question_No__c: '1',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  },
};

// File Question
export const FILEQUESTION: Question = {
  Id: '13',
  Name: 'QN-00003',
  Type__c: 'File',
  Question__c: 'Upload the Incident Report/Images?',
  Next_Question__c: 'a013t000013SS89AAG',
  Is_Optional__c: false,
  Group__c: 'Basic',
  Question_No__c: '1',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  },
};

// DateTime Question
export const TAQUESTION: Question = {
  Id: '14',
  Name: 'QN-00004',
  Type__c: 'TextArea',
  Question__c: 'Explain the particulars of the Incident?',
  Next_Question__c: 'a013t000013SS89AAG',
  Is_Optional__c: false,
  Group__c: 'Basic',
  Question_No__c: '1',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  },
};

// Radio Question
export const RADIOQUESTION: Question = {
  Id: '15',
  Name: 'QN-00005',
  Type__c: 'Radio',
  Question__c: 'Choose your favorite role',
  Next_Question__c: '',
  Is_Optional__c: false,
  Group__c: 'Basic',
  Question_No__c: '5',
  RecordType: {
    Id: 'UNCONDITIONAL',
    Name: '0123t000000VJ94AAG'
  },
  Question_Options__r: [
    {
      Id: '121',
      Name: '121N',
      Value__c: '121V',
      Next_Question__c: '',
    },
    {
      Id: '122',
      Name: '122N',
      Value__c: '122V',
      Next_Question__c: '',
    },
    {
      Id: '123',
      Name: '123N',
      Value__c: '123V',
      Next_Question__c: '',
    }
  ]
};
