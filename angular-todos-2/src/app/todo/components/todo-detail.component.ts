import { Component, Input } from '@angular/core';
import { ToDo } from 'src/app/todos/todos.interface';

@Component({
  selector: 'app-todo-detail',
  template: `
    <app-card [loading]="loading" [error]="error">
      <div>
        {{ todo?.title }}
        <sl-badge [variant]="todo?.completed ? 'primary' : 'danger'">{{
          todo?.completed ? 'Completed' : 'Pending'
        }}</sl-badge>
      </div>
    </app-card>
  `,
  styles: [
    `
      .todo-container {
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
      }
      .header {
        display: inline;
      }
      .user-id {
        font-style: italic;
        font-size: 10px;
      }
      .edit-btn {
        margin-right: 0.3rem;
      }
    `,
  ],
})
export class TodoDetailComponent {
  @Input()
  todo?: ToDo;
  @Input()
  loading?: boolean;
  @Input()
  error?: string;
}
