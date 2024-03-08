import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { SlInput } from '@shoelace-style/shoelace';

@Directive({
  selector: '[autoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(readonly ref: ElementRef) {}
  ngAfterViewInit(): void {
    console.log({ ref: this.ref });
    if (this.ref.nativeElement instanceof SlInput) {
      setTimeout(() => {
        this.ref.nativeElement.focus();
      }, 300);
    }
  }
}
