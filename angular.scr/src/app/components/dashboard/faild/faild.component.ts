import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faild',
  templateUrl: './faild.component.html',
  styleUrls: ['./faild.component.css']
})
export class FaildComponent implements OnInit {
  faildName: string[];
  faildMessage: string[];
  angry: string;
  deny: string;
  bargain: string;
  depress: string;
  accept: string;
  Done: boolean;

  constructor() { }

  ngOnInit() {
    this.faildName = ['angry', 'deny', 'bargian', 'depress', 'accept'];
  }

  done() {
    this.faildMessage = [this.angry, this.deny, this.bargain, this.depress, this.accept];
    this.Done = true;
  }

}
