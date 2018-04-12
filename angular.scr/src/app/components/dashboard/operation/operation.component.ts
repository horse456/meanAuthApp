import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  submited: boolean;
  edit: boolean;
  operationMessage:any;
  operationId: string;
  operation: object;
  todo: string[];
  done: boolean[];
  desc: string;
  result: boolean;

  @Output() onOperationId = new EventEmitter<string>();
  @Input() getOperationId: string;

  constructor(
              private flashMessage: FlashMessagesService,
              private router: Router,
              private dashboardService: DashboardService) { }

  ngOnInit() {
    this.todo = [];
    this.done = [];
  }

  onTodos (todos: string[]) {
    this.todo = todos
  }

  onDones (dones: boolean[]) {
    this.done = dones
  }

  onOperationFormSubmit() {
    // done[] have one false, then the result is false
    this.result = true;
    for ( let item of this.done) {
      if(!item) { this.result = false};  
    };
    const doc = this.operation = {
                              step: this.todo,
                              done: this.done,
                              result: this.result};
    console.log('operation Form Submit: ',this.operation);

    this.dashboardService.submitOperation(doc).subscribe( data => {
      if (data.success) {
        this.flashMessage.show("Operation was now submited  ", {cssClass: 'alert-success', timeout: 3000});
       
        // make flagged to hidden/show Form
        this.submited = true;
        
        // output the rehearsalMessage
        // const messages = JSON.stringify(doc);
        // console.log(messages);
        // this.operationMessage= messages.slice(2,messages.length-1).split("],");
        // this.operationMessage[0] += ']';
        // console.log('submit operationMessage: ',this.operationMessage);
        
        // get the smartId to edit
        this.operationId = data.operation._id;
        console.log('operationId: '+this.operationId)
      
        // pass the rehearsal Id to dashboard
        this.onOperationId.emit(this.operationId);
        
        // this.router.navigate(['/dashboard']);
        
      } else {
        this.flashMessage.show("add operation went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })

    
  }

  onOperationFormUpdate(){
    // done[] have one false, then the result is false
    if (this.done.indexOf(false) < 0 ) {this.result = true} else { this.result = false};

    const doc = this.operation =  {
                                  step: this.todo,
                                  done: this.done,
                                  result: this.result};
    const Id = this.operationId = this.getOperationId;
    console.log('update operationId:  ',Id);
    this.dashboardService.updateOperation(doc,Id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Operation are now updated  ", {cssClass: 'alert-success', timeout: 3000});
      
        // make flagged to hidden/show operation Form
        this.submited = true;
        this.edit = false;
        
        // output the operatioMessage
        // const messages = JSON.stringify(doc);
        // this.operationMessage= messages.slice(2,messages.length-1).split("],");
        // this.operationMessage[0] += ']';
        // console.log('update operatinMessage: '+ this.operationMessage)

        // pass the rehearsal Id to parent module
        this.onOperationId.emit(this.operationId);
        
      } else {
        this.flashMessage.show("update operation went wrong ", {cssClass: 'alert-danger', timeout: 3000});
      }
    })

  }
  
  onOperationFormEdit() {
    // show the Form
    this.submited = false;
    // hidden the edit button
    this.edit = true;
  }

}
