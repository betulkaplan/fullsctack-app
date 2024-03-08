import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="container">
      <div class="overlay" *ngIf="loading; else showContent">
        <app-loading-icon />
      </div>
      <ng-template #showContent>
        <div class="content">
          <ng-content></ng-content>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 200px;
        overflow: hidden;
      }

      .content {
        width: 100%;
        height: 100%;
      }

      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: var(--gray-color);
        opacity: 0.7;
      }
    `,
  ],
})
export class LoadingComponent {
  @Input()
  loading?: boolean;
}
