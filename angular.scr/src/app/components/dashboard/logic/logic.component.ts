import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DashboardService } from '../../../services/dashboard.service';

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
  varnier: string;
  existResult: boolean;
  unknowDeal: string[];
  unknowDealObject: any[];
  rehearsal: string;
  rehearsalMessage: string[];
  rehearsalObject: object;
  programDeal: string[];
  programDealObject: any[];
  result: boolean;

  submited: boolean;
  Clicked: boolean;
  Exist: boolean;
  Unknow: boolean;
  Program: boolean;
  ProgramSuccess: boolean;
  Faild: boolean;
  Success: boolean;
  Done: boolean;

  programItem: string[];
  unknowItem: string[];
  programMessage: any[];
  unknowMessage: any[];

  name: string[];
  rehearsalName: string[];

  logic: object;
  logicId: string;
  logicMessage: any[];

  @Input() logicItems: string[];
  @Output() LogicData = new EventEmitter<object>();
  @Output() DelLogic = new EventEmitter<string>();
  constructor(private dashboardService: DashboardService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.programDeal = [];
    this.unknowDeal = [];
    this.existResult = false;
    this.programItem = ['program'];
    this.unknowItem = ['unknow'];
    this.name = ['compass', 'importion', 'do & don\'t', 'dyanmic', 'imformation', 'result'];
    this.rehearsalName = ['subject', 'deadline', 'money', 'hp', 'mp', 'policy', 'problem', 'ratio'];
    this.unknowDealObject = [];
    this.programDealObject = [];
    this.unknowMessage = [];
    this.programMessage = [];
    this.result = false;
  }

  exist() {
    this.Exist = true;
    this.Clicked = true;
   }

  next() {
    this.Exist = false;
    this.Program = true;
    this.existResult = true;
  }

  unknow() {
    this.Unknow = true;
    this.Clicked = true;
  }

  unknowDealData(data) {
    this.unknowDeal.push(data._id);
    const Message = [data.compass, data.importion, data.dodont, data.dynamic, data.imformation, data.result];
    this.unknowMessage.push(Message);
    console.log('unknow deal message: ', this.unknowMessage);
    this.unknowDealObject.push(data);
  }

  unknowDelDeal(data) {
    const i = this.unknowDeal.indexOf(data);
    this.unknowDeal.splice(i, 1);
    this.unknowMessage.splice(i, 1);
    this.unknowDealObject.splice(i, 1);
    // deal deal form by id
    this.dashboardService.delDeal(data).subscribe(datas => {
      if (datas.success) {
        this.flashMessage.show('del deal form successed!', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('del deal went wrong!', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }


  unknowSuccess() {
    this.Success = true;
    this.Unknow = false;
    this.result = true;
  }

  program() {
    this.Program = true;
    this.Clicked = true;
  }

  onRehearsal(data) {
    this.rehearsal = data._id;
    this.rehearsalObject = data;
    this.rehearsalMessage = [data.subject, data.deadline, data.money, data.hp, data.mp, data.policy, data.problem, data.ratio];
  }

  programDealData(data) {
    this.programDeal.push(data._id);
    const Message = [data.compass, data.importion, data.dodont, data.dynamic, data.imformation, data.result];
    this.programMessage.push(Message);
    console.log('program deal message: ', this.programMessage);
    this.programDealObject.push(data);
  }

  programDelDeal(data) {
    const i = this.programDeal.indexOf(data);
    this.programDeal.splice(i, 1);
    this.programMessage.splice(i, 1);
    this.programDealObject.splice(i, 1);
    // deal deal form by id
    this.dashboardService.delDeal(data).subscribe(datas => {
      if (datas.success) {
        this.flashMessage.show('del deal form successed!', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('del deal went wrong!', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  programSuccess() {
    // show data by ul, and hidden program form
    this.Program = false;
    this.ProgramSuccess = true;
    this.result = true;
  }

  faild() {
    this.Faild = true;
    this.Exist = false;
    this.Program = false;
    this.Unknow = false;
  }

  submit() {
    const doc = this.logic = {
      state: this.state,
      collect: [this.web, this.expert, this.friend],
      policy: [this.imitate, this.varnier],
      existResult: this.existResult,
      unknowDeal: this.unknowDeal,
      rehearsal: this.rehearsal,
      programDeal: this.programDeal
    };
    // submit the logic form, and output the logic id
    this.dashboardService.submitLogic(doc).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('logic was now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show Form
        this.submited = true;

        // output the logicMessage
        this.logicMessage = [this.state,
           [this.web, this.expert, this.friend],
           [this.imitate, this.varnier],
           this.existResult, this.unknowDeal, this.rehearsal, this.programDeal];
        console.log('submit logicMessage: ', this.logicMessage);

        // get the logicId to edit
        this.logicId = data.Logic._id;
        console.log('logicId: ' + this.logicId);

        // pass the logic object to ask form
        const Datas = {
          _id: data.Logic._id,
          state: this.state,
          collect: [this.web, this.expert, this.friend],
          policy: [this.imitate, this.varnier],
          existResult: this.existResult,
          rehearsal: this.rehearsalObject,
          unknowDeal: this.unknowDealObject,
          programDeal: this.programDealObject,
          result: this.result
          };
        this.LogicData.emit(Datas);
        console.log('Logic Datas:', Datas);
        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add logic form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

  done() {
    // tell ask form, all project is done, failed!
    const doc = this.logic = {
      state: this.state,
      collect: [this.web, this.expert, this.friend],
      policy: [this.imitate, this.varnier],
      existResult: this.existResult,
      unknowDeal: this.unknowDeal,
      rehearsal: this.rehearsal,
      programDeal: this.programDeal
    };
    // submit the logic form, and output the logic id
    this.dashboardService.submitLogic(doc).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('logic was now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show Form
        this.submited = true;

        // output the logicMessage
        this.logicMessage = [this.state,
          [this.web, this.expert, this.friend],
          [this.imitate, this.varnier],
          this.existResult, this.unknowDeal, this.rehearsal, this.programDeal];
       console.log('submit logicMessage: ', this.logicMessage);

        // get the logicId to edit
        this.logicId = data.Logic._id;
        console.log('logicId: ' + this.logicId);

        // pass the logic object to ask form
        const Datas = {_id: data.Logic._id,
          state: this.state,
          collect: [this.web, this.expert, this.friend],
          policy: [this.imitate, this.varnier],
          existResult: this.existResult,
          rehearsal: this.rehearsalObject,
          unknowDeal: this.unknowDealObject,
          programDeal: this.programDealObject,
          result: this.result
          };
        this.LogicData.emit(Datas);
        console.log('Logic Datas:', Datas);

        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add logic form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    // hidden the faild form, and show ul
    this.Done = true;
  }

}
