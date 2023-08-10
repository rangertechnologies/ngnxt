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

      // Use Shengel Go Server IP/Domain  https://dev-api.shengelgo.com

      this.http.get('https://dev-api.shengelgo.com/nxt/api/process/?dataType=' + params[0] + '&operation=' + params[1] + '&param=' + params[2], { headers: headers , observe: 'response' })
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

}
