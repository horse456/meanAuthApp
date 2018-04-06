import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

  submitSmart(smart){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/smart/add', smart, {headers: headers})
      .map( res => res.json());
  }
  
  updateSmart(smart,Id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/smart/update?smartId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/smart/update?smartId='+Id, smart, {headers: headers})
      .map( res => res.json());
  }


}
