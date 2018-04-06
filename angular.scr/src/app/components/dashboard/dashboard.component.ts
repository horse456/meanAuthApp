import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  smart: FormGroup;
  submited: boolean;
  edit: boolean;
  smartMessage:any;
  smartId: String;

  constructor(private formBuilder: FormBuilder, 
              private flashMessage: FlashMessagesService,
              private router: Router,
              private dashboardService: DashboardService) { }

  ngOnInit() {
    this.smart = this.formBuilder.group({
      subject: ['',[Validators.required, Validators.minLength(8)]],
      speciafic: ['', [Validators.required]],
      measurable:  ['', [Validators.required]],
      achievable: ['', [Validators.required]],
      relevant: ['', [Validators.required]],
      timeBased:  ['', [Validators.required]],
      ratio: ['', [Validators.required]]
    })
  }

  onSmartFormSubmit() {
    const smart = this.smart.value;
    console.log(this.smart.value, this.smart.valid);
    // this.smartMessage= JSON.stringify(smart);
    // console.log(this.smartMessage)

    // Submit SmartForm
    this.dashboardService.submitSmart(smart).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show SmartForm
        this.submited = true;
        
        // output the smartMessage
        const messages = JSON.stringify(smart);
        this.smartMessage= messages.slice(2,messages.length-1).split(",");
        console.log(this.smartMessage)
        
        // get the smartId to edit
        this.smartId = data.smart._id
        console.log(this.smartId)
        
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onSmartFormUpdate(){
    const smart = this.smart.value;
    const Id = this.smartId;
    console.log(Id);
    this.dashboardService.updateSmart(smart,Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show SmartForm
        this.submited = true;
        this.edit = false;
        
        // output the smartMessage
        const messages = JSON.stringify(smart);
        this.smartMessage= messages.slice(2,messages.length-1).split(",");
        console.log(this.smartMessage)
        
      
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
  
  onSmartFormEdit() {
    this.submited = false;
    this.edit = true;

  }
  


}
