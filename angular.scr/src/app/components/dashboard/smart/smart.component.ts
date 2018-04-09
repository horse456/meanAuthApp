import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  styleUrls: ['./smart.component.css']
})

export class SmartComponent implements OnInit {
  smart: FormGroup;
  submited: boolean;
  edit: boolean;
  smartMessage:any;
  smartId: string;
  subject:string;
  timeBased: string;
  
  // when Edit button click, tell the parent to close all form except smart form
  @Output() onEdit = new EventEmitter<boolean>();
  // when Next button click, pass the message to dashboard
  @Output() onSmartId = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, 
              private flashMessage: FlashMessagesService,
              private router: Router,
              private dashboardService: DashboardService,
              ) { }

  ngOnInit() {
    this.smart = this.formBuilder.group({
      subject: ['',[Validators.required, Validators.minLength(8)]],
      speciafic: ['', [Validators.required]],
      measurable:  ['', [Validators.required]],
      achievable: ['', [Validators.required]],
      relevant: ['', [Validators.required]],
      timeBased:  ['', [Validators.required]],
      ratio: ['', [Validators.required]]
    });
 

  }

  onSmartFormSubmit() {
    const smart = this.smart.value;
    console.log('smart value: ',this.smart.value, this.smart.valid);


    // Submit SmartForm
    this.dashboardService.submitSmart(smart).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show SmartForm
        this.submited = true;
        
        // output the smartMessage
        const messages = JSON.stringify(smart);
        this.smartMessage= messages.slice(2,messages.length-1).split(",");
        console.log('smartMessage: ',this.smartMessage);
        
        // get the smartId to edit
        this.smartId = data.smart._id;
        this.subject = data.smart.subject;
        this.timeBased = data.smart.timeBased;
        console.log('smartId:'+ this.smartId)
      
        // pass  message to parent module
        const message = this.smartId+","+this.subject+","+this.timeBased;
        this.onSmartId.emit(message);
        console.log('smartform pass data: ', message)      
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onSmartFormUpdate(){
    const smart = this.smart.value;
    const Id = this.smartId;
    console.log('update smartId: ',Id);
    this.dashboardService.updateSmart(smart,Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show SmartForm
        this.submited = true;
        this.edit = false;
        
        // output the smartMessage
        const messages = JSON.stringify(smart);
        this.smartMessage= messages.slice(2,messages.length-1).split(",");
        console.log('updated smartMessage: ',this.smartMessage)

        // revalue the subject and deadline
        this.subject = this.smart.value.subject;
        this.timeBased = this.smart.value.timeBased;
        
        // pass  message to parent module
        const message = this.smartId+","+this.subject+","+this.timeBased;
        this.onSmartId.emit(message);
        console.log('smartform pass data: '+ message)      
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
  
  onSmartFormEdit() {
    // show the Form
    this.submited = false;
    // hidden the edit button
    this.edit = true;
    // tell dashboard to hidden all form except the smart form
    this.onEdit.emit(true)
  }




}
