import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

  state: string;
  action: string;
  reward: string;
  done: string;
  dynamics: string[];
  submited: boolean;
  finished: boolean;
  names: string[];
  dynamicTitle: string;

  addClick: boolean;

  @Output() Dynamics = new EventEmitter<Array<string>>();
  @Output() delDynamics = new EventEmitter<Array<string>>();
  @Input() dynamic: string[];

  constructor(private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.state = '';
    this.action = '';
    this.reward = '';
    this.done = '';
    this.submited = false;
    this.names = ['state', 'action', 'reward', 'done'];
  }

  push() {
    this.submited = !this.submited;
    this.dynamics = [this.state, this.action, this.reward, this.done];
  }

  finish() {
    this.finished = true;
    this.Dynamics.emit(this.dynamics);
  }

  // add new dynamic form
  addDynamic() {
    this.dynamics = [this.state, this.action, this.reward, this.done];
    if (this.state && this.action && this.reward && this.done) {
      // create one unquie number, make the dynamicTitle is unquired
      const d = new Date();
      this.dynamicTitle = this.dynamic[this.dynamic.length - 1];

      // create new form
      this.dynamic.push('a' + d.getTime());
      console.log('show dynamic items: ', this.dynamic);
      console.log('dynamic pass data: ', this.dynamics);
      this.Dynamics.emit(this.dynamics);
      // after clicked, make flag, and hidden the add button
      this.addClick = true;
    } else {
      this.flashMessage.show('you cant add dynamic form ', {cssClass: 'alert-danger', timeout: 3000});
    }
  }

  delDynamic() {
    // when item only have one, don't delete
    if (this.dynamic.length !== 1) {
      // delete the selected dynamic form by dynamicTitle
      const i = this.dynamic.indexOf(this.dynamicTitle);
      if (this.addClick) {
        this.dynamic.splice(i, 1);
      } else {
        this.dynamic.pop();
      }
      // let parent dynamics delete one
      this.delDynamics.emit(this.dynamics);
    } else {
      // when dyanmic.length is 1
      this.dynamic.pop();
      this.dynamic.push('a');
      this.delDynamics.emit(this.dynamics);
      this.submited = false;
      this.finished = false;
      // show the add button
      this.addClick = false;
    }
    console.log(this.dynamic);

  }

}
