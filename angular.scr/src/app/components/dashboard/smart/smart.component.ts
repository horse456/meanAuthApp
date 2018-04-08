import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from '../../../services/auth.service';


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
  postId: string;

  //get the user_id to write post doc to database
  userId: string;
  post: object;

  @Output() onSmartId = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, 
              private flashMessage: FlashMessagesService,
              private router: Router,
              private dashboardService: DashboardService,
              private authService: AuthService) { }

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
 
    //get the user_id to write post doc to database
    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.user._id;
      console.log('userId: ' + this.userId)
    },
    err => {
      console.log(err);
      return false;
    });
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
        console.log(this.smartMessage);
        
        // get the smartId to edit
        this.smartId = data.smart._id;
        this.subject = data.smart.subject;
        this.timeBased = data.smart.timeBased;
        console.log('smartId:'+ this.smartId)
      
        
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
    // show the Form
    this.submited = false;
    // hidden the edit button
    this.edit = true;
  }

  onSmartFormNext() {

    // create post doc to database 
    this.post = {
      subject: this.subject,
      userId: this.userId,
      smartId: this.smartId
    };
    console.log(this.post);

    // pust doc to database
    this.dashboardService.submitPost(this.post).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("You are now submited  ", {cssClass: 'alert-success', timeout: 3000});
        this.postId = data.post._id;
        console.log('postId: ' + this.postId)
        // pass  message to parent module
        const message = this.smartId+","+this.subject+","+this.timeBased+","+this.postId;
        this.onSmartId.emit(message);

      } else {
        this.flashMessage.show("Something went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })

  
    
  }




}
