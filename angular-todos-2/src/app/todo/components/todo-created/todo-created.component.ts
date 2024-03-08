import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-created',
  template: `
    <div [formGroup]="parent">
      <div formGroupName="created">
        <sl-input
          label="Created Date"
          type="text"
          placeholder="Created Date"
          formControlName="date"
        ></sl-input>
        <sl-input
          label="Created By"
          type="text"
          placeholder="Created By"
          formControlName="by"
        ></sl-input>
      </div>
    </div>
  `,
})
export class TodoCreatedComponent {
  @Input() parent: FormGroup;
  constructor() {}
}
