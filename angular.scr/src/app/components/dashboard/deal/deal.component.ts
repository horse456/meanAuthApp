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
  dealMessage: any[];
  name: string[];
  dealId: string;
  Deal: object;
  itemTitle: string;
  addClick: boolean;
  @Output() DealData = new EventEmitter<object>();
  @Output() DelDeal = new EventEmitter<string>();
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
    this.result = false;
    this.name = ['Compass   ', 'Importion  ', 'Do & Don\'t  ', 'Dynamic   ', 'information ', 'Result   '];
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
    // If this.item !=== undefined
    if (this.submited) {
      // create one unquie number, make the dynamicTitle is unquired
      const d = new Date();
      this.itemTitle = this.item[this.item.length - 1];

      // create new form
      this.item.push('a' + d.getTime());
      console.log('show items: ', this.item);
      // after clicked, make flag, and hidden the add button
      this.addClick = true;
    } else {
      this.flashMessage.show('you can\'t add deal form ', {cssClass: 'alert-danger', timeout: 3000});
    }
  }

  del() {
    // when item only have one, don't delete
    if (this.item.length !== 1) {
      // delete the selected dynamic form by dynamicTitle
      const i = this.item.indexOf(this.itemTitle);
      if (this.addClick) {
        this.item.splice(i, 1);
      } else {
        this.item.pop();
      }
      // let parent delete one deal by ID
      this.DelDeal.emit(this.dealId);
    } else {
      // when dyanmic.length is 1
      this.item.pop();
      this.item.push('a');
      this.DelDeal.emit(this.dealId);
      this.submited = false;
      // show the add button
      this.addClick = false;
    }
    console.log(this.item);

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
    this.dealMessage = [this.compass,
      [this.importion01, this.importion02, this.importion03, this.importion04],
      [this.do, this.dont],
      this.dynamics,
      this.information,
      this.result];


    // Submit DealForm
    this.dashboardService.submitDeal(doc).subscribe( data => {
      if (data.success) {
        this.flashMessage.show('You are now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show DealForm
        this.submited = true;

        // output the DealMessage
        // const messages = JSON.stringify(doc);

        // get the DealId to edit
        this.dealId = data.Deal._id;
        console.log('DealId:' + this.dealId);

        // pass  message to parent module
        if (this.item) {
          this.DealData.emit(data.Deal);
          console.log('Dealform pass data: ', data.Deal);
        }
        // this.router.navigate(['/dashboard']);

      } else {
        this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  onDealFormUpdate () {
    const doc = this.Deal = {
      compass: this.compass,
      importion: [this.importion01, this.importion02, this.importion03, this.importion04],
      dodont: [this.do, this.dont],
      dynamic: this.dynamics,
      information: this.information,
      result: this.result
    };
    this.dealMessage = [this.compass,
      [this.importion01, this.importion02, this.importion03, this.importion04],
     [this.do, this.dont],
     this.dynamics,
     this.information,
     this.result];
    const Id = this.dealId;
    console.log('update dealId: ', Id);
    this.dashboardService.updateDeal(doc, Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show DealForm
        this.submited = true;
        this.edit = false;

        // output the DealMessage
        console.log('updated DealMessage: ', this.dealMessage);

        // pass  message to parent module
        if (this.item) {
          this.DealData.emit(data.Deal);
          console.log('Dealform pass data: ', data.Deal);
        }

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
    // clear the dynamic datas
    this.dynamics = [];
  }



}
