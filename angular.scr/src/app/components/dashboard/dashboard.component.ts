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

    // Submit SmartForm
    this.dashboardService.submitSmart(smart).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login'])
      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }
    })
  }

  


}
