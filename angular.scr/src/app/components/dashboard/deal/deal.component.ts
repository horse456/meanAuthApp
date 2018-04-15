import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {

  compass: string;
  importion01: string;
  importion02: string;
  importion03: string;
  importion04: string;
  do: string[];
  dont: string[];
  desc01: string;
  desc02: string;
  dynamic: string[];
  dynamics: string[][];
  information: string;
  result: boolean;

  submited: boolean;
  edit: boolean;
  dealMessage: any;
  dealId: string;
  Deal: object;
  @Output() DealId = new EventEmitter<string>();

  @Output() items = new EventEmitter<Array<string>>();
  @Input() item: string[];

  constructor(
    private flashMessage: FlashMessagesService,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.do = [];
    this.dont = [];
    this.dynamic = ['a'];
    this.dynamics = [];
    this.desc01 = '';
    this.desc02 = '';

  }

  // add and delete do&don't form
  addDo() {
    this.do.push(this.desc01);
    this.desc01 = '';
  }

  removeDo(item) {
    const i = this.do.indexOf(item);
    this.do.splice(i, 1);
  }

  addDont() {
    this.dont.push(this.desc02);
    this.desc02 = '';
  }

  removeDont(item) {
    const i = this.dont.indexOf(item);
    this.dont.splice(i, 1);
  }

  // when dynamic click add, push one array; otherwise click del, delete one
  getDynamic(data: string[]) {
    let i = -1;
    // dynamics is string[][], we need to findout which index repeated.
    for (let y = 0; y < this.dynamics.length; y++) {
      if (this.dynamics[y].toString() === data.toString()) {
        console.log('the reapted index: ', y);
        return i = y;
      }
    }
    // if the submit was repeated, we do nothing; otherwise, we push the new data
    if (i < 0 ) {
      this.dynamics.push(data);
      console.log('add dynamics:  ', this.dynamics);
    }

  }

  delDynamic(data: string[]) {
    console.log('old dynamics:', this.dynamics);
    let i = -1;
    for (let y = 0; y < this.dynamics.length; y++) {
      if (this.dynamics[y].toString() === data.toString()) {
        console.log('the reapted index: ', y);
        i = y;
      }
    }
    // when dynamic is empty, we don't delete any message
    if (i > -1) {
      console.log('delete dynamics:', this.dynamics[i]);
      this.dynamics.splice(i, 1);
    }

  }

  // add the whole deal form
  add() {
    this.item.push('a');
    console.log(this.item);
    this.items.emit(this.item);
  }

  del() {
    // when item only have one, don't delete
    if (this.item.length !== 1) {
      this.item.pop();
    }
    console.log(this.item);
    this.items.emit(this.item);
  }

  onDealFormSubmit() {
    const doc = this.Deal = {
      compass: this.compass,
      importion: [this.importion01, this.importion02, this.importion03, this.importion04],
      dodont: [this.do, this.dont],
      dynamic: this.dynamics,
      information: this.information,
      result: this.result
    };
    console.log('Deal value: ', this.Deal);


    // Submit DealForm
    this.dashboardService.submitDeal(doc).subscribe( data => {
      if (data.success) {
        this.flashMessage.show('You are now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show DealForm
        this.submited = true;

        // output the DealMessage
        const messages = JSON.stringify(doc);
        this.dealMessage = messages.slice(2, messages.length - 1).split(',');
        console.log('DealMessage: ', this.dealMessage);

        // get the DealId to edit
        this.dealId = data.Deal._id;
        console.log('DealId:' + this.dealId);

        // pass  message to parent module
        const message = this.dealId;
        this.DealId.emit(message);
        console.log('Dealform pass data: ', message);
        // this.router.navigate(['/dashboard']);

      } else {
        this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  onDealFormUpdate() {
    const doc = this.Deal = {
      compass: this.compass,
      importion: [this.importion01, this.importion02, this.importion03, this.importion04],
      dodont: [this.do, this.dont],
      dynamic: this.dynamics,
      information: this.information,
      result: this.result
    };
    const Id = this.dealId;
    console.log('update dealId: ', Id);
    this.dashboardService.updateDeal(doc, Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show DealForm
        this.submited = true;
        this.edit = false;

        // output the DealMessage
        const messages = JSON.stringify(doc);
        this.dealMessage = messages.slice(2, messages.length - 1).split(',');
        console.log('updated DealMessage: ', this.dealMessage);

        // revalue the subject and deadline
        // this.subject = this.Deal.value.subject;
        // this.timeBased = this.Deal.value.timeBased;

        // pass  message to parent module
        const message = this.dealId ;
        this.DealId.emit(message);
        console.log('Dealform pass data: ' + message);
        // this.router.navigate(['/dashboard']);

      } else {
        this.flashMessage.show('update deal form Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  onDealFormEdit() {
    // show the Form
    this.submited = false;
    // hidden the edit button
    this.edit = true;
  }



}
