import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.css']
})
export class RehearsalComponent implements OnInit {
  rehearsal: FormGroup;
  submited: boolean;
  edit: boolean;
  rehearsalMessage:any;
  rehearsalId: string;

  @Output() onRehearsalId = new EventEmitter<string>();
  @Input() subject:string;
  @Input() deadline:string;

  constructor(private formBuilder: FormBuilder, 
              private flashMessage: FlashMessagesService,
              private router: Router,
              private dashboardService: DashboardService) { }

  ngOnInit() {
    this.rehearsal = this.formBuilder.group({
      subject: this.subject,
      deadline: this.deadline,
      money:  ['', [Validators.required]],
      hp: ['', [Validators.required]],
      mp: ['', [Validators.required]],
      policy:  ['', [Validators.required]],
      problem: ['', [Validators.required]],
      ratio: ['', [Validators.required]]
    });
 
  }

  onRehearsalFormSubmit() {
    const rehearsal = this.rehearsal.value;
    console.log(this.rehearsal.value, this.rehearsal.valid);

    // Submit SmartForm
    this.dashboardService.submitRehearsal(rehearsal).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show Form
        this.submited = true;
        
        // output the rehearsalMessage
        const messages = JSON.stringify(rehearsal);
        this.rehearsalMessage= messages.slice(2,messages.length-1).split(",");
        console.log(this.rehearsalMessage);
        
        // get the smartId to edit
        this.rehearsalId = data.rehearsal._id;
        console.log(this.rehearsalId)
      
        
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onRehearsalFormUpdate(){
    const rehearsal = this.rehearsal.value;
    const Id = this.rehearsalId;
    console.log(Id);
    this.dashboardService.updateRehearsal(rehearsal,Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show SmartForm
        this.submited = true;
        this.edit = false;
        
        // output the smartMessage
        const messages = JSON.stringify(rehearsal);
        this.rehearsalMessage= messages.slice(2,messages.length-1).split(",");
        console.log(this.rehearsalMessage)
        
      
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
  
  onRehearsalFormEdit() {
    // show the Form
    this.submited = false;
    // hidden the edit button
    this.edit = true;
  }

  onRehearsalFormNext() {
    // pass the rehearsal Id to parent module
    this.onRehearsalId.emit(this.rehearsalId);

  }

}
