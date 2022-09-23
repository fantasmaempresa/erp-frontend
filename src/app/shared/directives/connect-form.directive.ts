import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[connectForm]',
})
export class ConnectFormDirective {
  @Input()
  set connectForm(val: any) {
    let form: any = {};
    if (!val) {
      return;
    }
    val.forEach((field: any) => {
      form[field.key] = field.value;
    });
    this.formGroupDirective.form.setValue(form, {
      emitEvent: false,
      onlySelf: true,
    });
  }

  constructor(private formGroupDirective: FormGroupDirective) {}
}
