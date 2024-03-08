import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ToDo } from '../todos.interface';
import { HeaderComponent } from './header/header.component';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosSearchComponent } from './search/search.component';

export const components = [
  TodosDetailComponent,
  TodosListComponent,
  HeaderComponent,
  TodosSearchComponent,
];

@Component({
  selector: 'app-todos',
  template: `
    <div class="todos">
      <app-header (loadData)="loadData()"></app-header>
      <app-loading [loading]="loading">
        <div class="todos__container">
          <app-todos-search (search)="onSearch($event)"></app-todos-search>
          <app-todos-list [todos]="data"></app-todos-list>
        </div>
      </app-loading>
      <div *ngIf="error" class="container__error">{{ error }}</div>
    </div>
  `,
  styles: [
    `
      .todos__container {
        background-color: var(--weekColor);
      }
      .todos {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        box-sizing: border-box;
        max-width: 1200px;
        margin: 0px auto;
        width: 95%;
      }

      .todos__error {
        padding: 1rem;
        background-color: #ffd9c0;
      }
    `,
  ],
})
export class TodosViewComponent implements OnInit {
  error?: string;
  data?: ToDo[];
  loading?: boolean;

  get info() {
    return { loading: this.loading };
  }

  constructor(readonly apiService: ApiService) {}
  ngOnInit(): void {
    this.loadData();
  }

  onSearch(event: ToDo[]) {
    this.data = event;
  }

  loadData() {
    this.loading = true;
    this.apiService.getTodos().subscribe({
      next: (value) => {
        this.data = value;
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
  }
}
