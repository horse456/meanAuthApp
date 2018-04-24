import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css']
})
export class EmotionComponent implements OnInit {
  submited: boolean;
  Next: boolean;
  Fail: boolean;
  Success: boolean;
  hp: number;
  mp: number;
  hpDeal: string[];
  hpDealObject: any[];
  mpDeal: string[];
  mpDealObject: any[];
  result: boolean;
  emotion: object;
  emotionId: string;
  name: string[];

  hpItem: string[];
  mpItem: string[];
  hpMessage: string[];
  mpMessage: string[];
  Done: boolean;


  @Input() emotionItems: string[];
  @Output() EmotionData = new EventEmitter<Object>();
  @Output() DelEmotion = new EventEmitter<string>();

  constructor(private dashboardService: DashboardService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.hpItem = ['hp'];
    this.mpItem = ['mp'];
    this.name = ['compass', 'importion', 'do & don\'t', 'dyanmic', 'imformation', 'result'];
    this.hpDeal = [];
    this.mpDeal = [];
    this.hpDealObject = [];
    this.mpDealObject = [];
    this.result = false;
  }


  hpDealData(data) {
    this.hpDeal.push(data._id);
    console.log('hpDeal id: ', data._id);
    this.hpMessage = [data.compass, data.importion, data.dodont, data.dynamic, data.imformation, data.result];
    console.log('hp deal message: ', this.hpMessage);
    this.hpDealObject.push(data);
  }

  hpDelDeal(data: string) {
    console.log('del deal: ', data);
    const i = this.hpDeal.indexOf(data);
    this.hpDeal.splice(i, 1);
    this.hpDealObject.splice(i, 1);
    // deal deal form by id
    this.dashboardService.delDeal(data).subscribe(datas => {
      if (datas.success) {
        this.flashMessage.show('del deal form successed!', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('del deal went wrong!', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }


  mpDealData(data) {
    this.mpDeal.push(data._id);
    console.log('mpDeal id: ', data._id);
    this.mpMessage = [data.compass, data.importion, data.dodont, data.dynamic, data.imformation, data.result];
    console.log('mp deal message: ', this.mpMessage);
    this.mpDealObject.push(data);
  }

  mpDelDeal(data: string) {
    console.log('del deal: ', data);
    const i = this.mpDeal.indexOf(data);
    this.mpDeal.splice(i, 1);
    this.mpDealObject.splice(i, 1);
    // deal deal form by id
    this.dashboardService.delDeal(data).subscribe(datas => {
      if (datas.success) {
        this.flashMessage.show('del deal form successed!', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('del deal went wrong!', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  next() {
    // show the mp deal form
    this.Next = true;
  }

  fail() {
    // show the faild form
    this.Fail = true;
    if (this.Next) {
      this.Success = false;
    }
  }

  success() {
    // show data by ul, and make result true
    this.Success = true;
    this.result = true;
  }

  submit() {
    const doc = this.emotion = {
      hp: this.hp,
      mp: this.mp,
      hpDeal: this.hpDeal,
      mpDeal: this.mpDeal,
      result: this.result
    };
    // submit the emotion form, and output the emotion id
    this.dashboardService.submitEmotion(doc).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Emotion was now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show Form
        this.submited = true;

        // output the emotionMessage
        console.log('submit Emotion: ', data.Emotion);

        // get the emotionId to edit
        this.emotionId = data.Emotion._id;
        console.log('EmotionId: ' + this.emotionId);

        // pass the emotion object to ask form
        const Datas = {_id: data.Emotion._id,
                      hp: this.hp,
                      mp: this.mp,
                      hpDeal: this.hpDealObject,
                      mpDeal: this.mpDealObject,
                      result: this.result
        };
        this.EmotionData.emit(Datas);
        console.log('Emotion Datas:', Datas);

        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add Emotion form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

  done() {
    // tell ask form, all project is done, failed!
    const doc = this.emotion = {
      hp: this.hp,
      mp: this.mp,
      hpDeal: this.hpDeal,
      mpDeal: this.mpDeal,
      result: this.result
    };
    // submit the emotion form, and output the emotion id
    this.dashboardService.submitEmotion(doc).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Emotion was now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show Form
        this.submited = true;

        // output the emotionMessage
        console.log('submit Emotion: ', data.Emotion);

        // get the emotionId to edit
        this.emotionId = data.Emotion._id;
        console.log('EmotionId: ' + this.emotionId);

        // pass the emotion object to ask form
        const Datas = {_id: data.Emotion._id,
                  hp: this.hp,
                  mp: this.mp,
                  hpDeal: this.hpDealObject,
                  mpDeal: this.mpDealObject,
                  result: this.result
        };
        this.EmotionData.emit(Datas);
        console.log('Emotion Datas:', Datas);

        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add Emotion form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    console.log('submit emotion: ', doc);
    // hidden the faild form, and show ul
    this.Done = true;
  }

}
