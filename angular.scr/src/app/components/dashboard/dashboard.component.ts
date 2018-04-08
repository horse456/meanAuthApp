import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  created: boolean;
  rehearsal: boolean;
  smartId: string;
  subject: string;
  deadline: string;
  rehearsalId:string;
  operation: boolean;
  
  constructor () {

  }

  ngOnInit () {

  }

  onCreated () {
    // when click the create button, hidden the button and show the smart form
    this.created = true;

  }

  onSmart(data: string) {
    // get the data from smart form
    const arr = data.split(',');
    console.log(arr);
    this.smartId = arr[0];
    this.subject = arr[1];
    this.deadline = arr[2].slice(0,10);
    // show the rehearsal form
    this.rehearsal = true;
    
  }

  onRehearsal(data: string) {
      // get the data from rehearsal form
      this.rehearsalId = data;
      console.log(data);
      // show the rehearsal form
      this.operation = true;
  }

}
 