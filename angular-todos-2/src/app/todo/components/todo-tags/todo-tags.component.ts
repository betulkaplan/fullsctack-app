import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-tags',
  template: `
    <div [formGroup]="parent">
      <div formArrayName="tags">
        <span *ngFor="let tag of tags; let i = index">
          <span [formGroupName]="i">
            <sl-badge variant="primary" pill
              >{{ tag.value }}
              <span (click)="onRemove(tag, i)" class="remove-tag"
                >x</span
              ></sl-badge
            >
          </span>
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .remove-tag {
        padding-left: 0.2rem;
      }
      .remove-tag:hover {
        cursor: pointer;
        transform: scale(1.3);
      }
    `,
  ],
})
export class TodoTagsComponent {
  @Input() parent: FormGroup;

  @Output() removed = new EventEmitter();

  get tags() {
    return (this.parent.get('tags') as FormArray).controls;
  }

  onRemove(tag: unknown, index: number) {
    this.removed.emit({ tag, index });
  }
}
