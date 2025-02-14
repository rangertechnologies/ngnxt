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
Category__c: 'Simple',
Next__c : 'weiter',
Cancel__c :'zurück',
Back__c : 'zurück',
Submit__c : 'absenden',
Edit__c : 'Bearbeiten',
Next_Tracking_ID__c: '12345',
Back_Tracking_ID__c: '12345',
Cancel_Tracking_ID__c: '12345',
Submit_Tracking_ID__c: '12345',
First_Question__c: '1',
Title__c: 'Demo Unconditional',
Total_Questions__c: 3,
}
// Text Question
export const TESTQUESTION: Question = {
Id: '11',
Name: 'QN-00001',
Type__c: 'Text',
Allowed_File_Extensions__c : '.pdf',
Question_Text__c: 'What is your Name?',
Question__c: 'What is your Name?',
Next_Question__c: 'a013t000013SS89AAG',
Tracking_ID__c: '1234',
Is_Optional__c: false,
Is_Title__c: true,
X24_Hours__c: true,
Error_Message__c: 'Please Enter a Value',
Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
Group__c: 'Basic',
Size__c:1,
Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// DateTime Question
export const DTQUESTION: Question = {
Id: '12',
Name: 'QN-00002',
Type__c: 'DateTime',
Allowed_File_Extensions__c : '.pdf',
Question_Text__c: 'When did the incident happen?',
Question__c: 'When did the incident happen?',
Next_Question__c: 'a013t000013SS89AAG',
Tracking_ID__c: '1234',
Is_Optional__c: false,
Is_Title__c: true,
X24_Hours__c: true,
Error_Message__c: 'Please Enter a Value',
Is_Date_Backward__c : true,
  Is_Date_Forward__c : true  ,
Group__c: 'Basic',
Size__c:1,
Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// File Question
export const FILEQUESTION: Question = {
Id: '13',
Name: 'QN-00003',
Type__c: 'File',
Allowed_File_Extensions__c : '.pdf',
Question_Text__c: 'Upload the Incident Report/Images?',
Question__c: 'Upload the Incident Report/Images?',
Next_Question__c: 'a013t000013SS89AAG',
Tracking_ID__c: '1234',
Is_Optional__c: false,
Is_Title__c: true,
X24_Hours__c: true,
Error_Message__c: 'Please Enter a Value',
Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
Group__c: 'Basic',
Size__c:1,
Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// DateTime Question
export const TAQUESTION: Question = {
Id: '14',
Name: 'QN-00004',
Type__c: 'TextArea',
Allowed_File_Extensions__c : '.pdf',
Question_Text__c: 'Explain the particulars of the Incident?',
Question__c: 'Explain the particulars of the Incident?',
Next_Question__c: 'a013t000013SS89AAG',
Tracking_ID__c: '1234',
Is_Optional__c: false,
Is_Title__c: true,
X24_Hours__c: false,
Error_Message__c: 'Please Enter a Value',
Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
Group__c: 'Basic',
Size__c:1,
Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
};

// Radio Question
export const RADIOQUESTION: Question = {
Id: '15',
Name: 'QN-00005',
Type__c: 'Radio',
Allowed_File_Extensions__c : '.pdf',
Question_Text__c: 'Choose your favorite role',
Question__c: 'Choose your favorite role',
Tracking_ID__c: '1234',
Next_Question__c: '',
Is_Optional__c: false,
Is_Title__c: true,
X24_Hours__c: false,
Error_Message__c: 'Please Enter a Value',
Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
Group__c: 'Basic',
Size__c:1,
Question_No__c:'5',
RecordType: {
Name: 'UNCONDITIONAL'
},
Question_Options__r: {
records: [
            {
              Id: '121',
              Name: '121N',
              Value__c: '121V',
              Tracking_ID__c: '1234',
              Next_Question__c: '',
            },
            {
              Id: '122',
              Name: '122N',
              Value__c: '122V',
              Tracking_ID__c: '1234',
              Next_Question__c: '',
            },
            {
              Id: '123',
              Name: '123N',
              Value__c: '123V',
              Tracking_ID__c: '1234',
              Next_Question__c: '',
            }
          ]
}
};

// Checkbox Question
export const CHECKQUESTION: Question = {
Id: '16',
Name: 'QN-00006',
Type__c: 'Checkbox',
Allowed_File_Extensions__c : '.pdf',
Question_Text__c: 'Choose your favorite spots',
Question__c: 'Choose your favorite spots',
Tracking_ID__c: '1234',
Next_Question__c: '',
Is_Optional__c: false,
Is_Title__c: false,
X24_Hours__c: false,
Error_Message__c: 'Please Enter a Value',
Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
Group__c: 'Basic',
Size__c:1,
Question_No__c:'6',
RecordType: {
Name: 'CONDITIONAL'
},
Question_Options__r: {
records: [
            {
              Id: '121',
              Name: '121N',
              Value__c: '121V',
              Tracking_ID__c: '1234',
              Next_Question__c: '',
            },
            {
              Id: '122',
              Name: '122N',
              Value__c: '122V',
              Tracking_ID__c: '1234',
              Next_Question__c: '',
            },
            {
              Id: '123',
              Name: '123N',
              Value__c: '123V',
              Tracking_ID__c: '1234',
              Next_Question__c: '',
            }
          ]
}
};

// Book Question
export const BOOKQUESTION: Question = {
Id: '17',
Name: 'QN-00007',
Type__c: 'Book',
Allowed_File_Extensions__c : '.pdf',
Tracking_ID__c: '1234',
Question__c: 'Provide your Address',
Question_Text__c: 'Provide your Address',
Next_Question__c: '',
Is_Optional__c: false,
Is_Title__c: true,
X24_Hours__c: false,
Error_Message__c: 'Please Enter a Value',
Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
Group__c: 'Basic',
Size__c:1,
Question_No__c:'7',
Questions__r: {
records: [
{
  Id: '170',
  Name: 'QN-000070',
  Type__c: 'Dropdown',
  Question_Text__c: 'Land',
  Question__c: 'Land',
  Size__c:1,
  Allowed_File_Extensions__c : '.pdf',
  Tracking_ID__c: '1234',
  Is_Optional__c: false,
  Is_Title__c: true,
  X24_Hours__c:false,
  Error_Message__c: 'Please Enter a Value',
  Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
  Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  },
  Question_Options__r: {
    records: [
        {
          Id: '1',
          Name: 'D',
          Value__c: 'D',
          Tracking_ID__c: '1234',
          Next_Question__c: '',
        },
        {
          Id: '2',
          Name: 'CH',
          Value__c: 'CH',
          Tracking_ID__c: '1234',
          Next_Question__c: '',
        },
        {
          Id: '3',
          Name: 'UK',
          Value__c: 'UK',
          Tracking_ID__c: '1234',
          Next_Question__c: '',
        }
      ]
  }
},
{
  Id: '171',
  Name: 'QN-000071',
  Type__c: 'Text',
  Size__c:3,
  Allowed_File_Extensions__c : '.pdf',
  Question_Text__c: 'PLZ',
  Question__c: 'PLZ',
  Tracking_ID__c: '1234',
  Is_Optional__c: false,
  Is_Title__c: true,
  X24_Hours__c: false,
  Error_Message__c: 'Please Enter a Value',
  Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
  Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '172',
  Name: 'QN-000072',
  Type__c: 'Text',
  Allowed_File_Extensions__c : '.pdf',
  Tracking_ID__c: '1234',
  Question_Text__c: 'ORT',
  Question__c: 'ORT',
  Is_Optional__c: false,
  Is_Title__c: true,
  X24_Hours__c: false,
  Error_Message__c: 'Please Enter a Value',
  Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
  Size__c:8,
  Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '173',
  Name: 'QN-000073',
  Type__c: 'Text',
  Question_Text__c: 'StraBe',
  Question__c: 'StraBe',
  Tracking_ID__c: '1234',
  Is_Optional__c: false,
  Is_Title__c: true,
  X24_Hours__c:false,
  Error_Message__c: 'Please Enter a Value',
  Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
  Allowed_File_Extensions__c : '.pdf',
  Size__c:8,
  Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '174',
  Name: 'QN-000074',
  Type__c: 'Text',
  Allowed_File_Extensions__c : '.pdf',
  Tracking_ID__c: '1234',
  Question_Text__c: 'Hausnummer',
  Question__c: 'Hausnummer',
  Is_Optional__c: false,
  Is_Title__c: true,
  X24_Hours__c:false,
  Error_Message__c: 'Please Enter a Value',
  Is_Date_Backward__c : false,
  Is_Date_Forward__c : false,
  Size__c:4,
  Group__c: 'Basic',
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
