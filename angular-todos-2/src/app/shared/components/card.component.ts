import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <sl-card class="card-overview">
      <div *ngIf="header" slot="header">{{ header }}</div>
      <!-- Show loading state -->
      <app-loading [loading]="loading">
        <!-- Show error state -->
        <div *ngIf="error" class="generic-error">Error: {{ error }}</div>
        <!-- Show content -->
        <ng-content *ngIf="!loading && !error"></ng-content>
      </app-loading>
    </sl-card>
  `,
  styles: [
    `
      .generic-container {
        border-radius: 0.5rem;
        width: 300px;
        border: solid 1px var(--secondary-color);
        padding: 0.75rem;
      }

      .generic-error {
        font-size: 16px;
        text-align: center;
        padding: 20px;
        margin: 1rem;
        border-radius: 0.5rem;
        background-color: var(--strong-color);
      }
    `,
  ],
})
export class CardComponent {
  @Input() loading?: boolean;
  @Input() error?: string;
  @Input() header?: string;
}
