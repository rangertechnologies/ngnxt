import { Question, QuestionBook, AnswerBook } from './wrapper';

/*
export const TESTQUESTIONS: Question[] = [
{ Id: 11, Name: '001', question: 'What is your Name?' },
{ Id: 12, Name: '002', question: 'What is your favourite City?' },
{ Id: 13, Name: '003', question: 'How many languages you speak?' },
{ Id: 14, Name: '004', question: 'Share your feedback?' },
];
*/

// Dynamic Field Changes
export const TESTQB: QuestionBook = {
Id: 2,
Name: 'QB-0000',
RFAB__Category__c: 'Simple',
RFAB__Next__c : 'weiter',
RFAB__Cancel__c :'zurück',
RFAB__Back__c : 'zurück',
RFAB__Submit__c : 'absenden',
RFAB__Edit__c : 'Bearbeiten',
RFAB__Next_Tracking_ID__c: '12345',
RFAB__Back_Tracking_ID__c: '12345',
RFAB__Cancel_Tracking_ID__c: '12345',
RFAB__Submit_Tracking_ID__c: '12345',
RFAB__First_Question__c: '1',
RFAB__Title__c: 'Demo Unconditional',
RFAB__Total_Questions__c: 3,
}
// Text Question
export const TESTQUESTION: Question = {
Id: '11',
Name: 'QN-00001',
RFAB__Type__c: 'Text',
RFAB__Allowed_File_Extensions__c : '.pdf',
RFAB__Question_Text__c: 'What is your Name?',
RFAB__Question__c: 'What is your Name?',
RFAB__Next_Question__c: 'a013t000013SS89AAG',
RFAB__Tracking_ID__c: '1234',
RFAB__Is_Optional__c: false,
RFAB__Is_Title__c: true,
RFAB__X24_Hours__c: true,
RFAB__Error_Message__c: 'Please Enter a Value',
RFAB__Is_Date_Backward__c : false,
RFAB__Is_Date_Forward__c : false,
RFAB__Group__c: 'Basic',
RFAB__Size__c:1,
RFAB__Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// DateTime Question
export const DTQUESTION: Question = {
Id: '12',
Name: 'QN-00002',
RFAB__Type__c: 'DateTime',
RFAB__Allowed_File_Extensions__c : '.pdf',
RFAB__Question_Text__c: 'When did the incident happen?',
RFAB__Question__c: 'When did the incident happen?',
RFAB__Next_Question__c: 'a013t000013SS89AAG',
RFAB__Tracking_ID__c: '1234',
RFAB__Is_Optional__c: false,
RFAB__Is_Title__c: true,
RFAB__X24_Hours__c: true,
RFAB__Error_Message__c: 'Please Enter a Value',
RFAB__Is_Date_Backward__c : true,
RFAB__Is_Date_Forward__c : true  ,
RFAB__Group__c: 'Basic',
RFAB__Size__c:1,
RFAB__Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// File Question
export const FILEQUESTION: Question = {
Id: '13',
Name: 'QN-00003',
RFAB__Type__c: 'File',
RFAB__Allowed_File_Extensions__c : '.pdf',
RFAB__Question_Text__c: 'Upload the Incident Report/Images?',
RFAB__Question__c: 'Upload the Incident Report/Images?',
RFAB__Next_Question__c: 'a013t000013SS89AAG',
RFAB__Tracking_ID__c: '1234',
RFAB__Is_Optional__c: false,
RFAB__Is_Title__c: true,
RFAB__X24_Hours__c: true,
RFAB__Error_Message__c: 'Please Enter a Value',
RFAB__Is_Date_Backward__c : false,
RFAB__Is_Date_Forward__c : false,
RFAB__Group__c: 'Basic',
RFAB__Size__c:1,
RFAB__Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// DateTime Question
export const TAQUESTION: Question = {
Id: '14',
Name: 'QN-00004',
RFAB__Type__c: 'TextArea',
RFAB__Allowed_File_Extensions__c : '.pdf',
RFAB__Question_Text__c: 'Explain the particulars of the Incident?',
RFAB__Question__c: 'Explain the particulars of the Incident?',
RFAB__Next_Question__c: 'a013t000013SS89AAG',
RFAB__Tracking_ID__c: '1234',
RFAB__Is_Optional__c: false,
RFAB__Is_Title__c: true,
RFAB__X24_Hours__c: false,
RFAB__Error_Message__c: 'Please Enter a Value',
RFAB__Is_Date_Backward__c : false,
RFAB__Is_Date_Forward__c : false,
RFAB__Group__c: 'Basic',
RFAB__Size__c:1,
RFAB__Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// Radio Question
export const RADIOQUESTION: Question = {
Id: '15',
Name: 'QN-00005',
RFAB__Type__c: 'Radio',
RFAB__Allowed_File_Extensions__c : '.pdf',
RFAB__Question_Text__c: 'Choose your favorite role',
RFAB__Question__c: 'Choose your favorite role',
RFAB__Tracking_ID__c: '1234',
RFAB__Next_Question__c: '',
RFAB__Is_Optional__c: false,
RFAB__Is_Title__c: true,
RFAB__X24_Hours__c: false,
RFAB__Error_Message__c: 'Please Enter a Value',
RFAB__Is_Date_Backward__c : false,
RFAB__Is_Date_Forward__c : false,
RFAB__Group__c: 'Basic',
RFAB__Size__c:1,
RFAB__Question_No__c:'5',
RecordType: {
Name: 'UNCONDITIONAL'
},
RFAB__Question_Options__r: {
records: [
            {
              Id: '121',
              Name: '121N',
              RFAB__Value__c: '121V',
              RFAB__Tracking_ID__c: '1234',
              RFAB__Next_Question__c: '',
            },
            {
              Id: '122',
              Name: '122N',
              RFAB__Value__c: '122V',
              RFAB__Tracking_ID__c: '1234',
              RFAB__Next_Question__c: '',
            },
            {
              Id: '123',
              Name: '123N',
              RFAB__Value__c: '123V',
              RFAB__Tracking_ID__c: '1234',
              RFAB__Next_Question__c: '',
            }
          ]
}
};

// Checkbox Question
export const CHECKQUESTION: Question = {
Id: '16',
Name: 'QN-00006',
RFAB__Type__c: 'Checkbox',
RFAB__Allowed_File_Extensions__c : '.pdf',
RFAB__Question_Text__c: 'Choose your favorite spots',
RFAB__Question__c: 'Choose your favorite spots',
RFAB__Tracking_ID__c: '1234',
RFAB__Next_Question__c: '',
RFAB__Is_Optional__c: false,
RFAB__Is_Title__c: false,
RFAB__X24_Hours__c: false,
RFAB__Error_Message__c: 'Please Enter a Value',
RFAB__Is_Date_Backward__c : false,
RFAB__Is_Date_Forward__c : false,
RFAB__Group__c: 'Basic',
RFAB__Size__c:1,
RFAB__Question_No__c:'6',
RecordType: {
Name: 'CONDITIONAL'
},
RFAB__Question_Options__r: {
records: [
            {
              Id: '121',
              Name: '121N',
              RFAB__Value__c: '121V',
              RFAB__Tracking_ID__c: '1234',
              RFAB__Next_Question__c: '',
            },
            {
              Id: '122',
              Name: '122N',
              RFAB__Value__c: '122V',
              RFAB__Tracking_ID__c: '1234',
              RFAB__Next_Question__c: '',
            },
            {
              Id: '123',
              Name: '123N',
              RFAB__Value__c: '123V',
              RFAB__Tracking_ID__c: '1234',
              RFAB__Next_Question__c: '',
            }
          ]
}
};

// Book Question
export const BOOKQUESTION: Question = {
Id: '17',
Name: 'QN-00007',
RFAB__Type__c: 'Book',
RFAB__Allowed_File_Extensions__c : '.pdf',
RFAB__Tracking_ID__c: '1234',
RFAB__Question__c: 'Provide your Address',
RFAB__Question_Text__c: 'Provide your Address',
RFAB__Next_Question__c: '',
RFAB__Is_Optional__c: false,
RFAB__Is_Title__c: true,
RFAB__X24_Hours__c: false,
RFAB__Error_Message__c: 'Please Enter a Value',
RFAB__Is_Date_Backward__c : false,
RFAB__Is_Date_Forward__c : false,
RFAB__Group__c: 'Basic',
RFAB__Size__c:1,
RFAB__Question_No__c:'7',
RFAB__Questions__r: {
records: [
{
  Id: '170',
  Name: 'QN-000070',
  RFAB__Type__c: 'Dropdown',
  RFAB__Question_Text__c: 'Land',
  RFAB__Question__c: 'Land',
  RFAB__Size__c:1,
  RFAB__Allowed_File_Extensions__c : '.pdf',
  RFAB__Tracking_ID__c: '1234',
  RFAB__Is_Optional__c: false,
  RFAB__Is_Title__c: true,
  RFAB__X24_Hours__c:false,
  RFAB__Error_Message__c: 'Please Enter a Value',
  RFAB__Is_Date_Backward__c : false,
  RFAB__Is_Date_Forward__c : false,
  RFAB__Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  },
  RFAB__Question_Options__r: {
    records: [
        {
          Id: '1',
          Name: 'D',
          RFAB__Value__c: 'D',
          RFAB__Tracking_ID__c: '1234',
          RFAB__Next_Question__c: '',
        },
        {
          Id: '2',
          Name: 'CH',
          RFAB__Value__c: 'CH',
          RFAB__Tracking_ID__c: '1234',
          RFAB__Next_Question__c: '',
        },
        {
          Id: '3',
          Name: 'UK',
          RFAB__Value__c: 'UK',
          RFAB__Tracking_ID__c: '1234',
          RFAB__Next_Question__c: '',
        }
      ]
  }
},
{
  Id: '171',
  Name: 'QN-000071',
  RFAB__Type__c: 'Text',
  RFAB__Size__c:3,
  RFAB__Allowed_File_Extensions__c : '.pdf',
  RFAB__Question_Text__c: 'PLZ',
  RFAB__Question__c: 'PLZ',
  RFAB__Tracking_ID__c: '1234',
  RFAB__Is_Optional__c: false,
  RFAB__Is_Title__c: true,
  RFAB__X24_Hours__c: false,
  RFAB__Error_Message__c: 'Please Enter a Value',
  RFAB__Is_Date_Backward__c : false,
  RFAB__Is_Date_Forward__c : false,
  RFAB__Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '172',
  Name: 'QN-000072',
  RFAB__Type__c: 'Text',
  RFAB__Allowed_File_Extensions__c : '.pdf',
  RFAB__Tracking_ID__c: '1234',
  RFAB__Question_Text__c: 'ORT',
  RFAB__Question__c: 'ORT',
  RFAB__Is_Optional__c: false,
  RFAB__Is_Title__c: true,
  RFAB__X24_Hours__c: false,
  RFAB__Error_Message__c: 'Please Enter a Value',
  RFAB__Is_Date_Backward__c : false,
  RFAB__Is_Date_Forward__c : false,
  RFAB__Size__c:8,
  RFAB__Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '173',
  Name: 'QN-000073',
  RFAB__Type__c: 'Text',
  RFAB__Question_Text__c: 'StraBe',
  RFAB__Question__c: 'StraBe',
  RFAB__Tracking_ID__c: '1234',
  RFAB__Is_Optional__c: false,
  RFAB__Is_Title__c: true,
  RFAB__X24_Hours__c:false,
  RFAB__Error_Message__c: 'Please Enter a Value',
  RFAB__Is_Date_Backward__c : false,
  RFAB__Is_Date_Forward__c : false,
  RFAB__Allowed_File_Extensions__c : '.pdf',
  RFAB__Size__c:8,
  RFAB__Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '174',
  Name: 'QN-000074',
  RFAB__Type__c: 'Text',
  RFAB__Allowed_File_Extensions__c : '.pdf',
  RFAB__Tracking_ID__c: '1234',
  RFAB__Question_Text__c: 'Hausnummer',
  RFAB__Question__c: 'Hausnummer',
  RFAB__Is_Optional__c: false,
  RFAB__Is_Title__c: true,
  RFAB__X24_Hours__c:false,
  RFAB__Error_Message__c: 'Please Enter a Value',
  RFAB__Is_Date_Backward__c : false,
  RFAB__Is_Date_Forward__c : false,
  RFAB__Size__c:4,
  RFAB__Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
]
},
RecordType: {
Name: 'CONDITIONAL'
},
};
