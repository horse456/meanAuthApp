import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.css']
})
export class LogicComponent implements OnInit {

  state: string;
  web: string;
  expert: string;
  friend: string;
  imitate: string;
  vernier: string;
  existResult: boolean;
  unknowDeal: string[];
  rehearsal: string;
  programDeal: string[];

  clicked: boolean;
  Exist: boolean;
  Unknow: boolean;
  Program: boolean;
  Faild: boolean;
  Successe: boolean;

  constructor() { }

  ngOnInit() {
  }

  exist() { this.Exist = true; }

  next() { this.Exist = false; this.Program = true; }

  edit() { this.Exist = true; }

  unknow() { this.Unknow = true; }

  program() { this.Program = true; }

  faild() { this.Faild = true; }

  nextStep() {}

  done() {}

}
