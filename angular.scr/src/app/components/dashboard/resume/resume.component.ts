import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  submited: boolean;
  edit: boolean;
  resumeMessage:any;
  resumeId: string;
  resume: object;
  redefine01: any;
  redefine02: any;
  desc01: string;
  desc02: string;
  
  @Output() onResumeId = new EventEmitter<string>();
  @Input() getResumeId: string;
  @Input() subject: string;
  @Input() userId: string;

  constructor(
              private flashMessage: FlashMessagesService,
              private router: Router,
              private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.redefine01 = [];
    this.redefine02 = [];
    this.desc01 = '';
    this.desc02 = ''
  }

  addToredefine01() {
    this.redefine01.push(this.desc01);
    this.desc01 = ''
  }

  addToredefine02() {
    this.redefine02.push(this.desc02)
    this.desc02 = ''
  }

  onResumeFormSubmit() {
    const doc = this.resume = {
                              subject: this.subject,
                              userId: this.userId,
                              redefine: {re: this.redefine01,
                              new: this.redefine02}};
    console.log('Resume Form Submit: ',this.resume);

    this.dashboardService.submitResume(doc).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("Resume was now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show Form
        this.submited = true;
        
        // output the rehearsalMessage
        const messages = JSON.stringify(doc);
        console.log(messages);
        this.resumeMessage= messages.slice(2,messages.length-1).split("],");
        this.resumeMessage[0] += ']';
        console.log('submit resumeMessage: ',this.resumeMessage);
        
        // get the smartId to edit
        this.resumeId = data.resume._id;
        console.log('resumeId: '+this.resumeId)
      
        // pass the rehearsal Id to dashboard
        this.onResumeId.emit(this.resumeId);
        
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("add resume form, Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })

    
  }

  onResumeFormUpdate(){
    const doc = this.resume = {
                                subject: this.subject,
                                userId: this.userId,
                                redefine: {re: this.redefine01,
                                new: this.redefine02}};
    const Id = this.resumeId = this.getResumeId;
    console.log('update resumeId:  ',Id);
    this.dashboardService.updateResume(doc,Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Resume are now updated  ", {cssClass: 'alert-success', timeout: 3000});
      
        // make flagged to hidden/show SmartForm
        this.submited = true;
        this.edit = false;
        
        // output the smartMessage
        const messages = JSON.stringify(doc);
        this.resumeMessage= messages.slice(2,messages.length-1).split("],");
        this.resumeMessage[0] += ']';
        console.log('update resumeMessage: '+ this.resumeMessage)

        // pass the rehearsal Id to parent module
        this.onResumeId.emit(this.resumeId);
        
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })

  }
  
  onResumeFormEdit() {
    // show the Form
    this.submited = false;
    // hidden the edit button
    this.edit = true;
  }

}
