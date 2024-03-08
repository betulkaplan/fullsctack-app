import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { ToDo } from 'src/app/todos/todos.interface';

@Component({
  selector: 'app-todo',
  template: `
    <div class="container">
      <sl-card class="card-overview">
        <app-todo-detail
          *ngIf="formMode === 'off'"
          [todo]="todo"
          [loading]="loading"
          [error]="error"
        ></app-todo-detail>
        <app-todo-form-reactive
          *ngIf="formMode !== 'off'"
          [todo]="formMode === 'editting' ? todo : null"
          (update)="updateTodo($event)"
          (create)="createTodo($event)"
        ></app-todo-form-reactive>
        <div slot="footer">
          <sl-button
            (click)="setFormMode('editting')"
            variant="primary"
            pill
            *ngIf="formMode === 'off'; else cancel"
          >
            Edit Todo</sl-button
          >
          <ng-template #cancel>
            <sl-button (click)="setFormMode('off')" variant="danger" pill
              >Cancel</sl-button
            >
          </ng-template>
          <sl-button
            *ngIf="formMode === 'off'"
            (click)="setFormMode('creating')"
            variant="success"
            pill
            >New Todo</sl-button
          >
        </div>
      </sl-card>
      <hr />
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem auto;
      }
      .card-overview {
        max-width: 600px;
      }

      .card-overview small {
        color: var(--sl-color-neutral-500);
      }

      .card-overview [slot='footer'] {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class TodoViewComponent implements OnInit, OnDestroy {
  todo?: ToDo;
  loading?: boolean;
  error?: string;
  formMode: 'editting' | 'creating' | 'off' = 'off';

  private todoSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    readonly apiService: ApiService,
  ) {}

  async ngOnInit() {
    const paramMap = await firstValueFrom(this.route.paramMap);
    const id = paramMap.get('id');

    if (id) {
      this.loading = true;
      this.todoSubscription = this.apiService.getTodoById(id).subscribe({
        next: (todo) => {
          this.todo = todo;
          this.error = ''; // Clear any previous errors
        },
        error: (error) => {
          if (error instanceof Error) {
            this.error = error.message;
          }
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.error = 'Invalid Id';
    }
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  setFormMode(mode: 'editting' | 'creating' | 'off') {
    this.formMode = mode;
  }

  updateTodo(todo: ToDo) {
    this.apiService.updateTodo(todo).subscribe({
      next: (value) => {
        this.todo = value;
        this.formMode = 'off';
      },
      error: () => {
        this.formMode = 'off';
        window.alert('Could not update the todo');
      },
    });
  }

  createTodo(todo: ToDo) {
    this.apiService.createTodo(todo).subscribe({
      next: (value) => {
        this.todo = value;
        this.formMode = 'off';
      },
      error: () => {
        this.formMode = 'off';
        window.alert('Could not create the todo');
      },
    });
  }
}
