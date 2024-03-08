import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SlRadioGroup } from '@shoelace-style/shoelace';

@Directive({
  selector: 'sl-radio-group,sl-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDirective),
      multi: true,
    },
  ],
})
export class CustomDirective extends DefaultValueAccessor {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    super(renderer, el, false);
  }

  @HostListener('sl-input', ['$event.target'])
  onInput(target: HTMLElement) {
    if (target instanceof SlRadioGroup) {
      target.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
