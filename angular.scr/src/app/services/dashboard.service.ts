import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class DashboardService {
  authToken: any;

  constructor(private http: Http) { }

  // Smart form
  submitSmart(smart) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/smart/add', smart, {headers: headers})
      .map( res => res.json());
  }

  updateSmart(smart, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/smart/update?smartId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/smart/update?smartId='+Id, smart, {headers: headers})
      .map( res => res.json());
  }

  // Rehearsal form
  submitRehearsal(doc) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/rehearsal/add', doc, {headers: headers})
      .map( res => res.json());
  }

  updateRehearsal(doc, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/rehearsal/update?rehearsalId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/rehearsal/update?rehearsalId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

  // Post form
  submitPost(doc) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/post/add', doc, {headers: headers})
      .map( res => res.json());
  }

  updatePost(doc, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/post/update?postId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/post/update?postId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

  getPost(Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/dashboard/post?userId=' + Id, {headers: headers})
      .map( res => res.json());
  }

  // operation form
  submitOperation(doc) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/operation/add', doc, {headers: headers})
      .map( res => res.json());
  }

  updateOperation(doc, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/operation/update?operationId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/operation/update?operationId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

   // Resume form
   submitResume(doc) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/resume/add', doc, {headers: headers})
      .map( res => res.json());
  }

  updateResume(doc, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/resume/update?resumeId='+Id);
    return this.http.post('http://localhost:3000/users/dashboard/resume/update?resumeId='+Id, doc, {headers: headers})
      .map( res => res.json());
  }

  // Deal form
  submitDeal(doc) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/deal/add', doc, {headers: headers})
      .map( res => res.json());
  }

  updateDeal(doc, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/Deal/update?DealId=' + Id);
    return this.http.post('http://localhost:3000/users/dashboard/Deal/update?DealId=' + Id, doc, {headers: headers})
      .map( res => res.json());
  }

  delDeal(Id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/Deal/remove?DealId=' + Id);
    return this.http.post('http://localhost:3000/users/dashboard/Deal/remove?DealId=' + Id, {headers: headers})
      .map( res => res.json());
  }

  // Emotion form
  submitEmotion(doc) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/emotion/add', doc, {headers: headers})
      .map( res => res.json());
  }

  updateEmotion(doc, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/emotion/update?EmotionId=' + Id);
    return this.http.post('http://localhost:3000/users/dashboard/emotion/update?EmotionId=' + Id, doc, {headers: headers})
      .map( res => res.json());
  }


   // Logic form
  submitLogic(doc) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/dashboard/logic/add', doc, {headers: headers})
      .map( res => res.json());
  }

  updateLogic(doc, Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('http://localhost:3000/users/dashboard/logic/update?logicId=' + Id);
    return this.http.post('http://localhost:3000/users/dashboard/logic/update?logicId=' + Id, doc, {headers: headers})
      .map( res => res.json());
  }

   // Ask form
  submitAsk(doc) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:3000/users/dashboard/ask/add', doc, {headers: headers})
    .map( res => res.json());
  }

  updateAsk(doc, Id) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  console.log('http://localhost:3000/users/dashboard/ask/update?askId=' + Id);
  return this.http.post('http://localhost:3000/users/dashboard/ask/update?askId=' + Id, doc, {headers: headers})
    .map( res => res.json());
  }


}
