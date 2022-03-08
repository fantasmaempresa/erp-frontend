import {
  AfterViewInit,
  Directive,
  ElementRef,
  Injector,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../shared/services/form-validation.service';
import { ClassWatcher } from '../classes/ClassWatcher';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements AfterViewInit, OnDestroy {
  control!: AbstractControl | null | undefined;

  classWatcher!: ClassWatcher;

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

    this.classWatcher = new ClassWatcher(target, 'mat-form-field-invalid', () => {
      this.checkErrors();
    });
  }

  checkErrors() {
    if (this.control?.errors) {
      const error = this._validator.getErrorMessage(this.control);
      this._renderer2.setProperty(this._el.nativeElement, 'innerHTML', error);
    }
  }

  ngOnDestroy(): void {
    this.classWatcher.disconnect();
  }
}
