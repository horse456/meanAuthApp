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
  
  constructor () {

  }

  ngOnInit () {

  }

  onCreated () {
    // when click the create button, hidden the button and show the smart form
    this.created = true;

  }

  onRehearsal(smartId: string) {
    this.rehearsal = true;
    this.smartId = smartId;
    console.log(this.smartId,'click')
  }

}
 