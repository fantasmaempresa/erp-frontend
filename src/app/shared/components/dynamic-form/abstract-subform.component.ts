import { AbstractControl, ControlValueAccessor, UntypedFormGroup, ValidationErrors, Validator } from "@angular/forms";
import { Subscription } from "rxjs";

export abstract class AbstractSubformComponent<T = any>
  implements ControlValueAccessor, Validator {
  public formGroup: UntypedFormGroup = new UntypedFormGroup({});

  public onTouched: () => void = () => {
  };

  onChangeSubs: Subscription[] = [];

  constructor(public errorMessage: string = 'Form part not valid') {}

  getFormGroup(): UntypedFormGroup {
    return this.formGroup;
  }

  writeValue(val: T) {
    if (val) {
      this.formGroup.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any) {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid
      ? null
      : { invalidForm: { valid: false, message: this.errorMessage } };
  }
}
