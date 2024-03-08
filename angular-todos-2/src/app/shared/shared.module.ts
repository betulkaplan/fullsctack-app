import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading.component';
import { LoadingIconComponent } from './components/loading-icon.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent, LoadingIconComponent, CardComponent],
  exports: [LoadingComponent, CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
