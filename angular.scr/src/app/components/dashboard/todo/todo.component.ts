import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo: string[];
  done: boolean[];
  desc: string;

  @Output() todos = new EventEmitter<Array<string>>();
  @Output() dones = new EventEmitter<Array<boolean>>();
  @Input() Todo: string[];
  @Input() Done: boolean[];

  constructor() { }

  ngOnInit() {
    this.todo = this.Todo;
    this.done = this.Done;
    this.desc = ''
  }

  addTodo() {
    this.todo.push(this.desc);
    this.desc = '';
    this.done.push(false);
    // pass the arrays to parent
    this.todos.emit(this.todo);
    this.dones.emit(this.done)
  }

  toggleTodo(item) {
    const i = this.todo.indexOf(item);
    this.done[i] = !this.done[i];
    // pass the arrays to parent
    this.dones.emit(this.done)
  }

  removeTodo(item) {
    const i = this.todo.indexOf(item);
    this.todo.splice(i,1);
    this.done.splice(i,1)
    // pass the arrays to parent
    this.todos.emit(this.todo);
    this.dones.emit(this.done)
  }

}
