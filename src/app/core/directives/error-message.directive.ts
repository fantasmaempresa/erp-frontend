import { AfterViewInit, Directive, ElementRef, Injector, Renderer2 } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../shared/services/form-validation.service';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements AfterViewInit {
  control!: AbstractControl | null | undefined;

  constructor(
    private _el: ElementRef,
    private _inj: Injector,
    private _renderer2: Renderer2,
    private _validator: FormValidationService,
  ) {}

  ngAfterViewInit(): void {
    const inputRef = this._inj.get(MatFormField);
    this.control = inputRef._control.ngControl?.control;
    const target = inputRef._elementRef.nativeElement;
    this._renderer2.listen(target, 'focusout', () => {
      this.checkErrors();
    });
    this._renderer2.listen(target, 'input', () => {
      this.checkErrors();
    });
  }

  checkErrors() {
    if (this.control?.touched && this.control?.errors) {
      const error = this._validator.getErrorMessage(this.control);
      this._renderer2.setProperty(this._el.nativeElement, 'innerHTML', error);
    }
  }
}
