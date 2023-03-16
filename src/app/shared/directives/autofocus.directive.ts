import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterContentInit {
  constructor(private element: ElementRef) {}

  private _autofocus = true;

  @Input()
  set autofocus(value: boolean | string) {
    this._autofocus = coerceBooleanProperty(value);
  }

  public ngAfterContentInit(): void {
    setTimeout(() => this.element.nativeElement.focus(), 100);
  }
}
