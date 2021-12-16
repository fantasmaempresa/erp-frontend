import { AfterViewInit, Directive, ElementRef, Injector, Renderer2 } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements AfterViewInit {
  control!: AbstractControl | null | undefined;

  constructor(private _el: ElementRef, private _inj: Injector, private _renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    const inputRef = this._inj.get(MatFormField);
    this.control = inputRef._control.ngControl?.control;

    this.control?.statusChanges.subscribe(this.updateError.bind(this));
  }

  updateError() {
    this._renderer2.setProperty(this._el.nativeElement, 'innerHTML', `Error`);
  }
}
