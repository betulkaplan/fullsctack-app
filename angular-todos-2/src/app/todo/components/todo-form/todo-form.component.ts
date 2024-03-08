import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ToDo } from 'src/app/todos/todos.interface';

@Component({
  selector: 'app-todo-form',
  template: `
    <app-card header="Edit ToDo">
      <form
        (ngSubmit)="handleSubmit(form.value, form.valid)"
        #form="ngForm"
        novalidate
      >
        <sl-input
          label="Title"
          [ngModel]="todo?.title"
          #title="ngModel"
          name="title"
          autoFocus
        ></sl-input>
        <sl-input
          label="ID"
          [ngModel]="todo?.id"
          #id="ngModel"
          name="id"
          type="number"
        ></sl-input>
        <sl-radio-group
          label="Completed"
          [ngModel]="todo?.completed"
          #completed="ngModel"
          name="completed"
          [value]="todo?.completed"
          #radioGroupInput
        >
          <sl-radio [value]="true">Yes</sl-radio>
          <sl-radio [value]="false">No</sl-radio>
        </sl-radio-group>
        <sl-divider style="--spacing: .5rem;"></sl-divider>
        <sl-button
          size="small"
          variant="success"
          type="submit"
          [disabled]="form.invalid || !form.dirty"
          >Update Todo</sl-button
        >
      </form>
    </app-card>
  `,
  styles: [
    `
      .error {
        color: red;
        font-size: 9px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Input()
  todo?: ToDo;
  @Output()
  update: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  handleSubmit(todo: ToDo, valid: boolean | null) {
    if (valid) {
      this.update.emit(todo);
    }
  }
}
