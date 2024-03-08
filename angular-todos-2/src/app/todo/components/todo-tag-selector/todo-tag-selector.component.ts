import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TAG_SELECTOR_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TodoTagSelectorComponent),
  multi: true,
};

@Component({
  selector: 'app-todo-tag-selector',
  providers: [TAG_SELECTOR_CONTROL_ACCESSOR],
  template: `
    <sl-badge
      [variant]="value === option.text ? 'danger' : 'warning'"
      pill
      *ngFor="let option of options"
      (click)="select(option.text)"
      [ngStyle]="{
        color: value === option.text ? 'black' : 'white'
      }"
      class="tag-badge"
    >
      {{ option.text }}
    </sl-badge>
  `,
  styles: [
    `
      .tag-badge {
        cursor: pointer;
      }
    `,
  ],
})
export class TodoTagSelectorComponent implements ControlValueAccessor {
  private onModelChange: (value: string) => void;
  private onTouch: () => void;
  registerOnChange(callback: typeof this.onModelChange): void {
    // discuss why not like void return?
    this.onModelChange = callback;
  }
  registerOnTouched(callback: typeof this.onTouch): void {
    this.onTouch = callback;
  }
  writeValue(obj: string): void {
    this.value = obj;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }
  @Input() options: { text: string; color: string }[];

  value: string;

  select(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
