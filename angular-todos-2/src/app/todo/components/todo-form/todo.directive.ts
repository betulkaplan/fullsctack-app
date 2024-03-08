import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTodoDirective]',
})
export class TodoDirective {
  @Input() set appTodoDirective(colors: string[]) {
    let counter = 0;
    setInterval(() => {
      this.ref.nativeElement.style.border = `solid ${colors[counter]} 3px`;
      if (counter++ > colors.length - 1) counter = 0;
    }, 1000);
  }

  constructor(readonly ref: ElementRef) {}
}
