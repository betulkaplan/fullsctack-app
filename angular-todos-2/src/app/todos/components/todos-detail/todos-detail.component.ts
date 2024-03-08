import { Component, Input } from '@angular/core';
import { ToDo } from '../../todos.interface';

@Component({
  selector: 'app-todos-detail',
  template: `
    <a class="todos-detail" [routerLink]="['/todos', todo.id]">
      <span>{{ index + 1 }}. {{ todo.title | uppercase }}</span>
      <sl-badge [variant]="todo.completed ? 'primary' : 'danger'">{{
        todo.completed ? 'Completed' : 'Pending'
      }}</sl-badge>
    </a>
    <hr />
  `,
  styleUrls: ['todos-detail.component.css'],
})
export class TodosDetailComponent {
  @Input()
  todo: ToDo;
  @Input()
  index: number;
}
