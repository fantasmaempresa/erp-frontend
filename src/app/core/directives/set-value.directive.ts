import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[setValue]',
})
export class SetValueDirective {
  @Input()
  set setValue(val: any) {
    // @ts-ignore
    this.ngControl.control.setValue(val, { emitEvent: false });
  }

  constructor(private ngControl: NgControl) {}
}
