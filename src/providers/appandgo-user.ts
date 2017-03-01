import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
/*
  Generated class for the AppandgoUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppandgoUser {
 private apiUrl ="http://appandgo-mounir-customadmin.herokuapp.com/";
  constructor(public http: Http) {
    console.log('Hello AppandgoUser Provider');
  }
  auth(data):Observable<any>{
     console.log('authentification service');
     let headers = new Headers({'Content-Type': 'application/json'});
     //let options = new RequestOptions({headers: headers});
     let body = JSON.stringify(data);
     return this.http.post(this.apiUrl+'api/auth/login', data, headers).map((res:Response) => res.json());
  }
  facebookAuth(user):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl+'auth/facebook',user,headers).map((res:Response)=>res.json());
  }

}
