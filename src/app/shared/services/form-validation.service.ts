import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { genericErrorMessages } from '../../core/constants/validationMessages';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  getValidationErrors(
    group: UntypedFormGroup,
    validationMessages: { [key: string]: any },
  ): any {
    let formErrors: { [key: string]: any } = {};

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof UntypedFormGroup) {
        let groupError = this.getValidationErrors(
          abstractControl,
          validationMessages,
        );
        formErrors = { ...formErrors, ...groupError };
      }
    });
    return formErrors;
  }

  matchConfirmItems(
    controlName: string,
    confirmControlName: string,
  ): ValidatorFn {
    // @ts-ignore
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmControlName];
      if (!control || !confirmControl) {
        return null;
      }
      if (confirmControl.errors && !confirmControl.errors.mismatch) {
        return null;
      }
      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ mismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
    };
  }

  getErrorMessage(control: AbstractControl) {
    let error = '';
    if (control.errors) {
      const [[keyErr, objErr]]: [string, any][] = Object.entries(
        control.errors,
      );
      console.log(keyErr, objErr);
      if (genericErrorMessages[keyErr]) {
        error = genericErrorMessages[keyErr](objErr);
      } else {
        error = `${keyErr} is not defined`;
      }
    }
    return error;
  }
}
