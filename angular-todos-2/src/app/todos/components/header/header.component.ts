import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <h2>TODO List</h2>
      <sl-button (click)="loadData.emit()" variant="primary" size="small"
        >Load Data</sl-button
      >
    </div>
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 1rem;
      }
      .header h2 {
        margin: 0.5rem 0;
      }
    `,
  ],
})
export class HeaderComponent {
  @Output()
  readonly loadData = new EventEmitter<void>();
}
