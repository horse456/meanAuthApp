import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  items: boolean[];
  ration: number;
  process: string[];
  processObject: any[];
  result: boolean;

  Emotion: boolean;
  Logic: boolean;
  Success: boolean;
  Fail: boolean;
  submited: boolean;
  Done: boolean;
  Button: boolean;

  ask: object;
  askId: string;
  @Output() AskData = new EventEmitter<object>();

  constructor(private dashboardService: DashboardService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.items = [];
    this.process = [];
    this.processObject = [];
  }

  onEmotion(data) {
    this.process.push(data._id);
    this.processObject.push(data);
    // show the buttons
    this.Button = true;
    if (data.result) {
      this.Emotion = false;
      this.Logic = true;
    } else {
      this.Emotion = true;
      this.Logic = true;
    }
  }

  onLogic(data) {
    this.process.push(data._id);
    this.processObject.push(data);
     // show the buttons
     this.Button = true;
    if (data.result) {
      this.Emotion = true;
      this.Logic = false;
    } else {
      this.Emotion = true;
      this.Logic = true;
    }
  }

  addEmotion() {
    this.items.push(true);
     // hide the buttons
     this.Button = false;
  }

  addLogic() {
    this.items.push(false);
    // hide the buttons
    this.Button = false;
  }

  success() {
    this.result = true;
    const doc = this.ask = {
      ration: this.ration,
      process: this.process,
      result: this.result
    };
    // submit the ask form, and output the ask id
    this.dashboardService.submitAsk(doc).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Ask was now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show Form
        this.submited = true;

        // output the askMessage
        console.log('submit Ask: ', data.Ask);

        // get the askId to edit
        this.askId = data.Ask._id;
        console.log('AskId: ' + this.askId);

        // pass the ask object to ask form
        const Datas = {_id: data.Ask._id,
                      ration: this.ration,
                      process: this.processObject,
                      result: this.result
        };
        this.AskData.emit(Datas);
        console.log('Ask Datas:', Datas);

        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add Ask form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    // show congratulation and hidden buttons
    this.Success = true;
    // hide the buttons
    this.Button = false;
  }

  fail() {
    // show the fail form
    this.Fail = true;
    this.Done = true;
    // hide the buttons
    this.Button = false;
  }

  done() {
    this.result = false;
    const doc = this.ask = {
      ration: this.ration,
      process: this.process,
      result: this.result
    };
    // submit the ask form, and output the ask id
    this.dashboardService.submitAsk(doc).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Ask was now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show Form
        this.submited = true;

        // output the askMessage
        console.log('submit Ask: ', data.Ask);

        // get the askId to edit
        this.askId = data.Ask._id;
        console.log('AskId: ' + this.askId);

        // pass the ask object to ask form
        const Datas = {_id: data.Ask._id,
                      ration: this.ration,
                      process: this.processObject,
                      result: this.result
        };
        this.AskData.emit(Datas);
        console.log('Ask Datas:', Datas);

        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add Ask form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    // hideen Done buttons
    this.Done = false;
  }

}
