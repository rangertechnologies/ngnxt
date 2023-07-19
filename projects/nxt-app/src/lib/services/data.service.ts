import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('https://dummyjson.com/products/1');
  }
  
  getQuestionBook(bookId:any):Observable<any> {
    const sessionId = '00D3t000004Rpes!ARsAQM53MKMZt0NbGZXvM9nF7y4eHmafsmq2rZPmZ45G5GaZTHQYg6Yt1Yw2TjugyyfS84HUXVbQqEvUo1HgAmUhmTmAIwaq';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionId}`);
    //.set('Origin', 'http://localhost:4200');

   // return this.http.get('https://nxtdev-dev-ed.my.salesforce.com/services/apexrest/Nxt/?dataType=QuestionBook&operation=read&param1=' + bookId, { headers });
    return this.http.get('http://localhost:5000/nxt/dataType=QuestionBook&operation=read&param1=' + bookId);
  }

  getQuestion(questionId:any):Observable<any>{
    const sessionId = '00D3t000004Rpes!ARsAQM53MKMZt0NbGZXvM9nF7y4eHmafsmq2rZPmZ45G5GaZTHQYg6Yt1Yw2TjugyyfS84HUXVbQqEvUo1HgAmUhmTmAIwaq';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionId}`);
    //.set('Origin', 'http://localhost:4200');
    return this.http.get('http://localhost:5000/nxt/dataType=Question&operation=read&param1=' + questionId);
  }
}
