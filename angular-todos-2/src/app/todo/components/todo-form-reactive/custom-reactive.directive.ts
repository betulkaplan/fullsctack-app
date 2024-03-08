import { Directive, forwardRef, HostListener } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'sl-select[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlSelectControlDirective),
      multi: true,
    },
  ],
})
export class SlSelectControlDirective extends DefaultValueAccessor {
  @HostListener('sl-change', ['$event.target.value'])
  handleSelectChange(value: string) {
    this.onChange(value);
  }
}
