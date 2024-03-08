import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodosViewComponent, components } from './components';
import { TodosRoutingModule } from './todos-routing.module';
import { APIModule } from '../api/api.module';

@NgModule({
  imports: [CommonModule, SharedModule, TodosRoutingModule, APIModule],
  declarations: [TodosViewComponent, ...components],
  exports: [TodosViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TodosModule {}
