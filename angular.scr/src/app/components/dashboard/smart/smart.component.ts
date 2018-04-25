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
  smartMessage: string[];
  smartId: string;
  subject: string;
  timeBased: string;
  name: string[];

  // when Edit button click, tell the parent to close all form except smart form
  @Output() Edit = new EventEmitter<boolean>();
  // when Next button click, pass the message to dashboard
  @Output() SmartData = new EventEmitter<object>();

  constructor(private formBuilder: FormBuilder,
              private flashMessage: FlashMessagesService,
              private router: Router,
              private dashboardService: DashboardService,
              ) { }

  ngOnInit() {
    this.smart = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.minLength(8)]],
      speciafic: ['', [Validators.required]],
      measurable:  ['', [Validators.required]],
      achievable: ['', [Validators.required]],
      relevant: ['', [Validators.required]],
      timeBased:  ['', [Validators.required]],
      ratio: ['', [Validators.required]]
    });
    this.name = ['subject', 'speciafic', 'measurable', 'achievable', 'relevant', 'timeBased', 'ratio'];
  }

  onSmartFormSubmit() {
    const smart = this.smart.value;
    console.log('smart value: ', this.smart.value, this.smart.valid);


    // Submit SmartForm
    this.dashboardService.submitSmart(smart).subscribe( data => {
      if (data.success) {
        this.flashMessage.show('Smart form are now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show SmartForm
        this.submited = true;

        // output the smartMessage
        this.smartMessage = [data.smart.subject, data.smart.speciafic, data.smart.measurable, data.smart.achievable,
           data.smart.relevant, smart.timeBased, data.smart.ratio];
        console.log('smartMessage: ', this.smartMessage);

        this.smartId = data.smart._id;

        // pass  message to parent module
        this.SmartData.emit(data.smart);
        console.log('smartform pass data: ', data.smart);
        // this.router.navigate(['/dashboard']);

      } else {
        this.flashMessage.show('submit smart form went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  onSmartFormUpdate() {
    const smart = this.smart.value;
    const Id = this.smartId;
    console.log('update smartId: ', Id);
    this.dashboardService.updateSmart(smart, Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('smart form are now submited  ', {cssClass: 'alert-success', timeout: 3000});

        // make flagged to hidden/show SmartForm
        this.submited = true;
        this.edit = false;

        // output the smartMessage
        this.smartMessage = [data.smart.subject, data.smart.speciafic, data.smart.measurable, data.smart.achievable,
          data.smart.relevant, smart.timeBased, data.smart.ratio];
        console.log('updated smartMessage: ', this.smartMessage);

        // pass  message to parent module
        this.SmartData.emit(data.smart);
        console.log('smartform pass data: ' + data.smart);
        // this.router.navigate(['/dashboard']);

      } else {
        this.flashMessage.show('updated smart form went wrong ', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  onSmartFormEdit() {
    // show the Form
    this.submited = false;
    // hidden the edit button
    this.edit = true;
    // tell dashboard to hidden all form except the smart form
    this.Edit.emit(true);
  }




}
