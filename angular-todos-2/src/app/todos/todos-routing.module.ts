import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosViewComponent } from './components';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

const routes: Routes = [
  {
    title: 'Todo List',
    path: '',
    component: TodosViewComponent,
  },
  {
    title: 'Add Todo',
    path: 'add',
    component: AddTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
