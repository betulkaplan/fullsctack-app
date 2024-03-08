import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AsyncInput } from 'src/app/shared/utils';
import { ToDo } from 'src/app/todos/todos.interface';

@Component({
  selector: 'app-todo-form-reactive',
  template: `
    <div>
      <h2>{{ todo ? 'Edit Todo' : 'Create New Todo' }}</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="todo-form">
        <sl-input
          label="Title"
          type="text"
          placeholder="Title"
          formControlName="title"
        ></sl-input>
        <sl-input
          label="Description"
          type="text"
          placeholder="Description"
          formControlName="description"
        ></sl-input>
        <app-todo-created *ngIf="!isEdit" [parent]="form"></app-todo-created>
        <app-todo-tag-selector
          [options]="tagOptions"
          formControlName="tagSelector"
        ></app-todo-tag-selector>
        <app-todo-tags
          [parent]="form"
          (removed)="removeTag($event)"
        ></app-todo-tags>
        <p>You have {{ form.get('tags')?.value?.length }} tags</p>
        <sl-radio-group formControlName="completed">
          <sl-radio [value]="true">Completed</sl-radio>
          <sl-radio [value]="false">Pending</sl-radio>
        </sl-radio-group>
        <div>
          <sl-button type="submit" [disabled]="form.invalid">Submit</sl-button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .todo-form {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
    `,
  ],
})
export class ReactiveTodoFormComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  isEdit: boolean;
  private _todo: AsyncInput<ToDo>;

  @Input()
  set todo(value: AsyncInput<ToDo>) {
    if (value) {
      this.isEdit = false;
      this.form.patchValue(value);
      // Only for array manually insert controls
      value.tags?.forEach((tag: string) => {
        this.form.controls.tags.push(new FormControl(tag));
      });
    } else {
      this.isEdit = true;
      this.form.reset();
    }
    this._todo = value;
  }

  get todo(): AsyncInput<ToDo> {
    return this._todo;
  }

  @Output()
  update: EventEmitter<ToDo> = new EventEmitter<ToDo>();
  @Output()
  create: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  tagOptions: { text: string; color: string }[] = [
    { text: 'daily', color: '#456789' },
    { text: 'work', color: '#456722' },
    { text: 'school', color: '#455789' },
    { text: 'official', color: '#996789' },
  ];

  readonly form = this.fb.group({
    id: [0],
    title: [''],
    description: [''],
    completed: [false],
    // Readonly
    created: this.fb.group({
      date: [{ value: '', disabled: true }],
      by: [
        {
          value: '',
          disabled: true,
        },
      ], // random id in ui for now
    }),
    tagSelector: [''],
    tags: this.fb.array<string>([], Validators.maxLength(5)),
    // TODO: modified by/date as an Array
  });

  constructor(readonly fb: FormBuilder) {}
  ngOnInit() {
    this.subscription = this.form
      .get('tagSelector')
      ?.valueChanges.subscribe((value) => {
        if (value) this.addTag(value);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    if (this.form.value) {
      const todo: ToDo = createTodoOf(this.form.value);
      if (this._todo) {
        this.update.emit(todo);
      } else {
        this.create.emit(todo);
      }
    }
  }
  addTag(tag: string) {
    const control = this.form.get('tags') as FormArray;
    new FormControl(tag);
    control.push(new FormControl(tag));
  }
  removeTag({ tag, index }: { tag: FormControl; index: number }) {
    console.log(`Removing ${tag.value}`);
    const control = this.form.get('tags') as FormArray;
    control.removeAt(index);
  }
}

// Recursive typing
type NullablePartial<T> = {
  [P in keyof T]?: NullablePartial<T[P]> | null;
};

const createTodoOf = <T extends NullablePartial<ToDo>>(value: T): ToDo => {
  console.log({ tags: value.tags });
  const definedTags: string[] = [];
  value.tags?.forEach((element) => {
    if (element) definedTags.push(element);
  });
  return {
    id: value.id || 0,
    title: value.title || '',
    description: value.description || '',
    completed: value.completed || false,
    created: {
      date: value.created?.date || '',
      by: value.created?.by || '',
    },
    tags: definedTags,
  };
};
