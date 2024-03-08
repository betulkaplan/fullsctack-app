import { Component, Input } from '@angular/core';
import { ToDo } from '../../todos.interface';

@Component({
  selector: 'app-todos-list',
  template: `
    <div class="todos-list">
      <ng-template #noData>
        <div class="todos-list__no-data">No Data</div>
      </ng-template>
      <div *ngIf="todos; else noData">
        <div *ngFor="let todo of todos; let index = index">
          <app-todos-detail [todo]="todo" [index]="index"></app-todos-detail>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .todos-list {
        overflow: auto;
      }
      .todos-list__no-data {
        justify-content: center;
        align-items: center;
        display: flex;
      }
    `,
  ],
})
export class TodosListComponent {
  @Input()
  todos?: ToDo[];
}
