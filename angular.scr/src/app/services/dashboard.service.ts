import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

  // Smart form
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

  // Rehearsal form
  submitRehearsal(doc){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/rehearsal/add', doc, {headers: headers})
      .map( res => res.json());
  }
  
  updateRehearsal(doc,Id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/rehearsal/update?rehearsalId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/rehearsal/update?rehearsalId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

  // Post form
  submitPost(doc){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/post/add', doc, {headers: headers})
      .map( res => res.json());
  }
  
  updatePost(doc,Id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/post/update?postId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/post/update?postId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

  // operation form
  submitOperation(doc){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/operation/add', doc, {headers: headers})
      .map( res => res.json());
  }
  
  updateOperation(doc,Id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/operation/update?operationId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/operation/update?operationId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

   // Resume form
   submitResume(doc){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/resume/add', doc, {headers: headers})
      .map( res => res.json());
  }
  
  updateResume(doc,Id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/resume/update?resumeId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/resume/update?resumeId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

}
