import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  created: boolean;
  userId: string;
  smartId: string;
  subject: string;
  deadline: string;
  postId: string;
  post: object;
  Rehearsal: boolean;
  rehearsalId: string;
  operation: boolean;
  operationId: string;
  result: boolean;
  resume: boolean;
  resumeId: string;
  ask: boolean;
  askId: string;
  deal: boolean;
  dealId: string;
  other: object;

  items: any[];

  constructor (private authService: AuthService,
              private dashboardService: DashboardService,
              private flashMessage: FlashMessagesService) {

  }

  ngOnInit () {
    // get the user_id to write post doc to database
    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.user._id;
      console.log('userId: ' + this.userId);
      this.dashboardService.getPost(this.userId).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Get all posts by userId', {cssClass: 'alert-success', timeout: 3000});
            console.log('Get posts: ' + data.post);
            this.items = data.post;
            console.log('this.items :' + this.items);
        } else {
          this.flashMessage.show('Geting posts went wrong ', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    },
    err => {
      console.log(err);
      return false;
    });

    // Init post doc
    this.post = {
      subject: this.subject,
      userId: this.userId,
      smartId: this.smartId,
      rehearsalId: this.rehearsalId,
      operationId: this.operationId,
      result: this.result,
      resumeId: this.resumeId,
      askId: this.askId,
      dealId: this.dealId,
      other: {}
    };

    // use items to decide how many <app-deal> to add
    this.result = false;

  }

  onCreated () {
    // when click the create button, hidden the button and show the smart form and resume form
    this.created = true;
    // this.resume = true;

    // create post doc to database
    this.post = {userId: this.userId};
    console.log('created new post:', this.post);

    // pust doc to database
    this.dashboardService.submitPost(this.post).subscribe( data => {
      if (data.success) {
        this.flashMessage.show( ' You are now submited  ', {cssClass: 'alert-success', timeout: 3000});
        this.postId = data.post._id;
        console.log('postId: ' + this.postId );

      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

  onSmart(datas) {
    if (!this.smartId) {
      // get the data from smart form
      this.smartId = datas._id;
      this.subject = datas.subject;
      this.deadline = datas.timeBased.slice(0, 10);
      // add datas to post doc and update by the postId
      this.post = {
        subject: this.subject,
        userId: this.userId,
        smartId: this.smartId,
        result: this.result
      };
      // console.log(this.post);
      this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
        if (data.success) {
          this.flashMessage.show('You are now updated  ', {cssClass: 'alert-success', timeout: 3000});
          console.log('update postId: ' + this.postId);

        } else {
          this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

    this.smartId = datas._id;
    this.subject = datas.subject;
    this.deadline = datas.timeBased.slice(0, 10);
    // show the rehearsal form
    this.Rehearsal = true;

  }

  onSmartEdit() {
    // hidded all forms except smartform
    this.Rehearsal = false;
    this.operation = false;
    this.resume = false;
  }

  onRehearsal(datas) {

      if (!this.rehearsalId) {
        // get the data from rehearsal form
        this.rehearsalId = datas._id;
        // console.log(datas);

        // add datas to post doc and update by the postId
        this.post = {
          subject: this.subject,
          userId: this.userId,
          smartId: this.smartId,
          rehearsalId: this.rehearsalId,
          result: this.result
        };
        // console.log('updated post: ', this.post);
        this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
          if (data.success) {
            this.flashMessage.show('You are now updated  ', {cssClass: 'alert-success', timeout: 3000});
            console.log('update postId: ' + this.postId);

          } else {
            this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
          }
        });

      }

      // show the operation form
      this.operation = true;
  }

  onOperation(datas) {
    if (!this.operationId) {
      // get the data from operation form
      this.operationId = datas._id;

      // add datas to post doc and update by the postId
      this.post = {
        subject: this.subject,
        userId: this.userId,
        smartId: this.smartId,
        rehearsalId: this.rehearsalId,
        operationId: this.operationId,
        result: this.result
      };
      // console.log(this.post);
      this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
        if (data.success) {
          this.flashMessage.show('Post are now updated  ', {cssClass: 'alert-success', timeout: 3000});
          console.log('update postId: ' + this.postId);

        } else {
          this.flashMessage.show('updated post went wrong ', {cssClass: 'alert-danger', timeout: 3000});
        }
      });

    }
    // show the ask form or resume form
    this.ask = true;

  }

  onAsk(datas) {
    this.askId = datas._id;

      // add datas to post doc and update by the postId
      this.post = {
        subject: this.subject,
        userId: this.userId,
        smartId: this.smartId,
        rehearsalId: this.rehearsalId,
        operationId: this.operationId,
        askId: this.askId
      };
      console.log(this.post);
      this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
        if (data.success) {
          this.flashMessage.show('You are now updated  ', {cssClass: 'alert-success', timeout: 3000});
          console.log('update postId: ' + this.postId);

        } else {
          this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
        }
      });

  }

  onResume(datas) {
    if (!this.resumeId) {
      // get the data from operation form
      this.resumeId = datas._id;

      // add datas to post doc and update by the postId
      this.post = {
        subject: this.subject,
        userId: this.userId,
        smartId: this.smartId,
        rehearsalId: this.rehearsalId,
        operationId: this.operationId,
        resumeId: this.resumeId
      };
      console.log(this.post);
      this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
        if (data.success) {
          this.flashMessage.show('You are now updated  ', {cssClass: 'alert-success', timeout: 3000});
          console.log('update postId: ' + this.postId);

        } else {
          this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
        }
      });

    }

  }

  done() {
    // result is true
    this.post = {
      subject: this.subject,
      userId: this.userId,
      smartId: this.smartId,
      rehearsalId: this.rehearsalId,
      operationId: this.operationId,
      result: this.result,
      resumeId: this.resumeId,
      askId: this.askId,
      other: {}
    };
    this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
      if (data.success) {
        this.flashMessage.show('You are now updated  ', {cssClass: 'alert-success', timeout: 3000});
        console.log('update postId: ' + this.postId);

      } else {
        this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
