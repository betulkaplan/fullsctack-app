import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TodoViewComponent } from './components';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { APIModule } from '../api/api.module';
import { TodoDetailComponent } from './components/todo-detail.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoDirective } from './components/todo-form/todo.directive';
import { CustomDirective } from './components/todo-form/custom.directive';
import { AutoFocusDirective } from './components/todo-form/autofocus.directive';
import { ReactiveTodoFormComponent } from './components/todo-form-reactive/todo-form-reactive.component';
import { TodoCreatedComponent } from './components/todo-created/todo-created.component';
import { TodoTagsComponent } from './components/todo-tags/todo-tags.component';
import { TodoTagSelectorComponent } from './components/todo-tag-selector/todo-tag-selector.component';
import { SlSelectControlDirective } from './components/todo-form-reactive/custom-reactive.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    SharedModule,
    APIModule,
  ],
  declarations: [
    TodoViewComponent,
    TodoDetailComponent,
    TodoFormComponent,
    ReactiveTodoFormComponent,
    TodoCreatedComponent,
    TodoTagsComponent,
    TodoTagSelectorComponent,
    TodoDirective,
    CustomDirective,
    SlSelectControlDirective,
    AutoFocusDirective,
  ],
  exports: [TodoViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CustomDirective, AutoFocusDirective],
})
export class TodoModule {}
