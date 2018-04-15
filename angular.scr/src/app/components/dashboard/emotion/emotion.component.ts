import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css']
})
export class EmotionComponent implements OnInit {

  Next: boolean;
  Faild: boolean;
  Successe: boolean;
  hp: number;
  mp: number;
  hpDeal: string;
  mpDeal: string;
  result: boolean;

  constructor() { }

  ngOnInit() {
  }

  next() {
    // show the mp deal form
    this.Next = true;
    // get npDeal id
  }

  faild() {
    // show the faild form
    this.Faild = true;
  }

  successe() {
    // show data by ul, and make result true
    this.Successe = true;
    this.result = true;
    // get mpDeal id
  }

  nextStep() {
    // submit the emotion form, and output the emotion id
  }

  done() {
    // tell ask form, all project is done, failed!
  }

}
