import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getAPIData(tkn: string, 
    params: string[],
    resolve,
    reject,
    config?: any) {
      console.log('inside DataService.getAPIData for ' + tkn);
      const self = this;

      // Call the ShengelGo Server
      const headers = new HttpHeaders().set('Authorization', `${tkn}`);
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');

      // Use Shengel Go Server IP/Domain
      this.http.get('https://127.0.0.1:8000/nxt/api/process/?dataType=' + params[0] + '&operation=' + params[1] + '&param=' + params[2], { headers: headers , observe: 'response' })
        .subscribe(response => {
          if(response.status == 200) {
            resolve(response.body);
          } else {
            reject(response.body);
          }
        }, error => {
          console.log(error.status);
          reject(error);
        });
  }

  // Remove all unwanted code below - Vijay

  getData(): Observable<any> {
    return this.http.get('https://dummyjson.com/products/1');
  }
  
  getQuestionBook(bookId:any, tkn:any):Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${tkn}`);
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    // return this.http.get('https://nxtdev-dev-ed.my.salesforce.com/services/apexrest/Nxt/?dataType=QuestionBook&operation=read&param1=' + bookId, { headers });
    return this.http.get('https://dev-api.shengelgo.com/nxt/api/questionbook?id=' + bookId, { headers });
  }

  getQuestion(questionId:any):Observable<any>{
    const sessionId = '00D3t000004Rpes!ARsAQM53MKMZt0NbGZXvM9nF7y4eHmafsmq2rZPmZ45G5GaZTHQYg6Yt1Yw2TjugyyfS84HUXVbQqEvUo1HgAmUhmTmAIwaq';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionId}`);
    //.set('Origin', 'http://localhost:4200');
    return this.http.get('http://localhost:5000/nxt/dataType=Question&operation=read&param1=' + questionId);
  }
}
