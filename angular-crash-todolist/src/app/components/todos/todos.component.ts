import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[]; //Pretty much class type, created in models

  constructor(private todoService: TodoService) { } //Used pretty much on importing services, other operations are used in ngOnInit

  ngOnInit(): void { // created hook from vue or didmount react
    this.todoService.getTodos().subscribe(todos => this.todos = todos); //Calling the service method subscribe is the same as .then
  }

  deleteTodo(todo: Todo) {
    //Deletes from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //Deletes from Server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => this.todos.push(todo))
  }

}
