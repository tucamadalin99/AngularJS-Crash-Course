import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo; //props ish and passing to child from parent
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter(); //Passing to parent

  constructor(private todoServce: TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }
  
  //Event methods
  onToggle(todo) {
    //Toggle in UI
    todo.completed = !todo.completed
    //Toggle on server-side
    this.todoServce.toggleCompleted(todo).subscribe(todo => console.log(todo)); //Put method to update
  }
  
  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

}
