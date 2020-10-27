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
Is_Title__c: true,
Group__c: 'Basic',
Size__c:1,
Next__c : "weiter",
Back__c : "zurück",
Cancel__c : "Cancel",
Submit__c : "absenden",
Question_No__c: '1',
RecordType: {
Name: 'UNCONDITIONAL'
},
Additional_Text__c: '<p>Uns ist es wichtig, die Vorteile der digitalen Kommunikation zu nutzen!</p><p><br></p><p>Verträge schließen wir nach dem sogenannten Antragsmodell, d.h. Sie oder Ihr Vertriebspartner übermitteln uns auf elektronischem Weg über das Onlineportal des Vertriebspartners einen unverbindlichen Antrag.</p><p><br></p><p>Deswegen benötigen wir von Ihnen immer eine aktuelle E-Mail-Adresse.Wir prüfen Ihren Antrag. </p><p><br></p><p>Der Vertrag kommt erst zustande, wenn wir Ihren Antrag annehmen. Annahme oder Ablehnung erfolgen durch eine gesonderte Mitteilung.</p><p><br></p><p>Wir glauben, dass die digitale Kommunikation auch für Sie viele Vorteile bietet!</p><p><br></p><p>Deswegen arbeiten wir mit einer speziell für unsere Versicherungsprodukte entwickelten App (App). Dort erreichen wir Sie und Sie uns schnell und unkompliziert, egal ob im Schadensfall, bei Vertragsänderung oder für Informationen. </p><p><br></p><p>Sie erklären sich damit einverstanden, dass rechtlich bedeutsame Erklärungen – soweit gesetzlich zulässig - digital per E-Mail an die von Ihnen zuletzt genannte E-Mail-Adresse zugestellt werden können.</p>',
};

// DateTime Question
export const DTQUESTION: Question = {
Id: '12',
Name: 'QN-00002',
Type__c: 'DateTime',
Question__c: 'When did the incident happen?',
Next_Question__c: 'a013t000013SS89AAG',
Is_Optional__c: false,
Is_Title__c: true,
Group__c: 'Basic',
Size__c:1,
Next__c: "weiter",
Back__c : "zurück",
Cancel__c : "Cancel",
Submit__c : "absenden",
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
Question__c: 'Upload the Incident Report/Images?',
Next_Question__c: 'a013t000013SS89AAG',
Is_Optional__c: false,
Is_Title__c: true,
Group__c: 'Basic',
Size__c:1,
Next__c: "weiter",
Back__c : "zurück",
Cancel__c : "Cancel",
Submit__c : "absenden",
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
Question__c: 'Explain the particulars of the Incident?',
Next_Question__c: 'a013t000013SS89AAG',
Is_Optional__c: false,
Is_Title__c: true,
Group__c: 'Basic',
Size__c:1,
Next__c: "weiter",
Back__c : "zurück",
Cancel__c : "Cancel",
Submit__c : "absenden",
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
Question__c: 'Choose your favorite role',
Next_Question__c: '',
Is_Optional__c: false,
Is_Title__c: true,
Group__c: 'Basic',
Size__c:1,
Next__c: "weiter",
Back__c : "zurück",
Cancel__c : "Cancel",
Submit__c : "absenden",
Question_No__c: '5',
RecordType: {
Name: 'UNCONDITIONAL'
},
Question_Options__r: {
records: [
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
}
};

// Checkbox Question
export const CHECKQUESTION: Question = {
Id: '16',
Name: 'QN-00006',
Type__c: 'Checkbox',
Question__c: 'Choose your favorite spots',
Next_Question__c: '',
Is_Optional__c: false,
Is_Title__c: false,
Group__c: 'Basic',
Size__c:1,
Next__c: "weiter",
Back__c : "zurück",
Cancel__c : "Cancel",
Submit__c : "absenden",
Question_No__c: '6',
RecordType: {
Name: 'CONDITIONAL'
},
Question_Options__r: {
records: [
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
}
};

// Book Question
export const BOOKQUESTION: Question = {
Id: '17',
Name: 'QN-00007',
Type__c: 'Book',
Question__c: 'Provide your Address',
Next_Question__c: '',
Is_Optional__c: false,
Is_Title__c: true,
Group__c: 'Basic',
Size__c:1,
Next__c: 'weiter',
Back__c : "zurück",
Cancel__c : "Cancel",
Submit__c : "absenden",
Question_No__c: '7',
Questions__r: {
records: [
{
  Id: '170',
  Name: 'QN-000070',
  Type__c: 'Dropdown',
  Question__c: 'Land',
  Size__c:1,
  Next__c: "weiter",
  Back__c : "zurück",
  Cancel__c : "Cancel",
  Submit__c : "Submit",
  Is_Optional__c: false,
  Is_Title__c: true,
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
          Next_Question__c: '',
        },
        {
          Id: '2',
          Name: 'CH',
          Value__c: 'CH',
          Next_Question__c: '',
        },
        {
          Id: '3',
          Name: 'UK',
          Value__c: 'UK',
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
  Next__c: "weiter",
  Back__c : "zurück",
  Cancel__c : "Cancel",
  Submit__c : "absenden",
  Question__c: 'PLZ',
  Is_Optional__c: false,
  Is_Title__c: true,
  Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '172',
  Name: 'QN-000072',
  Type__c: 'Text',
  Question__c: 'ORT',
  Is_Optional__c: false,
  Is_Title__c: true,
  Size__c:8,
  Next__c: "weiter",
  Back__c : "zurück",
  Cancel__c : "Cancel",
  Submit__c : "absenden",
  Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '173',
  Name: 'QN-000073',
  Type__c: 'Text',
  Question__c: 'StraBe',
  Is_Optional__c: false,
  Is_Title__c: true,
  Size__c:8,
  Next__c: "weiter",
  Back__c : "zurück",
  Cancel__c : "Cancel",
  Submit__c : "absenden",
  Group__c: 'Basic',
  RecordType: {
    Name: 'UNCONDITIONAL'
  }
},
{
  Id: '174',
  Name: 'QN-000074',
  Type__c: 'Text',
  Question__c: 'Hausnummer',
  Is_Optional__c: false,
  Is_Title__c: true,
  Size__c:4,
  Next__c: "weiter",
  Back__c : "zurück",
  Cancel__c : "Cancel",
  Submit__c : "absenden",
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
