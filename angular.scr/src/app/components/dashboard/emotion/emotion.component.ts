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
  Faild: boolean;
  Successe: boolean;
  hp: number;
  mp: number;
  hpDeal: string[];
  mpDeal: string[];
  result: boolean;
  emotion: object;
  emotionId: string;
  emotionMessage: any[];
  name: string[];

  hpItem: string[];
  mpItem: string[];
  hpMessage: string[];
  mpMessage: string[];
  Done: boolean;
  faildMessage: string[];
  faildName: string[];
  angry: string;
  deny: string;
  bargain: string;
  depress: string;
  accept: string;

  @Input() emtionItems: string[];
  @Output() EmotionData = new EventEmitter<Object>();
  @Output() DelEmotion = new EventEmitter<string>();

  constructor(private dashboardService: DashboardService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.hpItem = ['hp'];
    this.mpItem = ['mp'];
    this.name = ['compass', 'importion', 'do & don\'t', 'dyanmic', 'imformation', 'result'];
    this.faildName = ['angry', 'deny', 'bargian', 'depress', 'accept'];
    this.hpDeal = [];
    this.mpDeal = [];
  }


  hpDealData(data) {
    this.hpDeal.push(data._id);
    console.log('hpDeal id: ', data._id);
    this.hpMessage = [data.compass, data.importion, data.dodont, data.dynamic, data.imformation, data.result];
    console.log('hp deal message: ', this.hpMessage);
  }

  hpDelDeal(data: string) {
    console.log('del deal: ', data);
    const i = this.hpDeal.indexOf(data);
    this.hpDeal.splice(i, 1);
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
  }

  mpDelDeal(data: string) {
    console.log('del deal: ', data);
    const i = this.mpDeal.indexOf(data);
    this.mpDeal.splice(i, 1);
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

  faild() {
    // show the faild form
    this.Faild = true;
  }

  successe() {
    // show data by ul, and make result true
    this.Successe = true;
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
        this.emotionMessage = [this.hp, this.mp, this.hpDeal, this.mpDeal, this.result];
        console.log('submit EmotionMessage: ', this.emotionMessage);

        // get the emotionId to edit
        this.emotionId = data.Emotion._id;
        console.log('EmotionId: ' + this.emotionId);

        // pass the emotion object to ask form
        this.EmotionData.emit(data.Emotion);

        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add Emotion form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    console.log('submit emotion: ', doc);
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
        // this.submited = true;

        // output the emotionMessage
        this.emotionMessage = [this.hp, this.mp, this.hpDeal, this.mpDeal, this.result];
        console.log('submit EmotionMessage: ', this.emotionMessage);

        // get the emotionId to edit
        this.emotionId = data.Emotion._id;
        console.log('EmotionId: ' + this.emotionId);

        // pass the emotion object to ask form
        this.EmotionData.emit(data.Emotion);

        // this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('add Emotion form, Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    console.log('submit emotion: ', doc);
    // hidden the faild form, and show ul
    this.Done = true;
    this.faildMessage = [this.angry, this.deny, this.bargain, this.depress, this.accept];
  }

}
