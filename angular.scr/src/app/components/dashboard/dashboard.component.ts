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
  rehearsal: boolean;
  rehearsalId:string;
  operation: boolean;
  operationId: string;
  result: string;
  resume: boolean;
  resumeId: string;
  ask: boolean;
  askId: string;
  deal: boolean;
  dealId: string;
  other: object;
 
  constructor (private authService: AuthService,
              private dashboardService: DashboardService,
              private flashMessage: FlashMessagesService) {

  }

  ngOnInit () {
    //get the user_id to write post doc to database
    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.user._id;
      console.log('userId: ' + this.userId)
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
  }

  onCreated () {
    // when click the create button, hidden the button and show the smart form
    this.created = true;

    // create post doc to database 
    this.post = {userId:this.userId};
    console.log(this.post);

    // pust doc to database
    this.dashboardService.submitPost(this.post).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
        this.postId = data.post._id;
        console.log('postId: ' + this.postId)

      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })

  }

  onSmart(data: string) {
    if(!this.smartId) {
      // get the data from smart form
      const arr = data.split(',');
      console.log(arr);
      this.smartId = arr[0];
      this.subject = arr[1];
      this.deadline = arr[2].slice(0,10);
      // add datas to post doc and update by the postId
      this.post = {
        subject: this.subject,
        userId: this.userId,
        smartId: this.smartId,
      };
      console.log(this.post);
      this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
        if (data.success) {
          this.flashMessage.show("You are now updated  ", {cssClass: 'alert-success', timeout: 3000});
          console.log('update postId: ' + this.postId)

        } else {
          this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
        }
      })
    }

    // show the rehearsal form
    this.rehearsal = true;
    
  }

  onSmartEdit() {
    // hidded all forms except smartform
    this.rehearsal = false;
    this.operation = false;
    this.resume = false;
  }

  onRehearsal(data: string) {
      
      if(!this.rehearsalId) {
        // get the data from rehearsal form
        this.rehearsalId = data;
        console.log(data);

        // add datas to post doc and update by the postId
        this.post = {
          subject: this.subject,
          userId: this.userId,
          smartId: this.smartId,
          rehearsalId: this.rehearsalId
        };
        console.log(this.post);
        this.dashboardService.updatePost(this.post, this.postId).subscribe( data => {
          if (data.success) {
            this.flashMessage.show("You are now updated  ", {cssClass: 'alert-success', timeout: 3000});
            console.log('update postId: ' + this.postId)

          } else {
            this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
          }
        });

      } 
      
      // show the rehearsal form
      this.operation = true;
  }

}
 