import { Injectable } from '@angular/core';
import { FormField } from '../classes/FormField';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormfieldControlService {
  toFormGroup(inputs: FormField<string>[]): FormGroup {
    const group: any = {};
    inputs.forEach((input) => {
      let validator: ValidatorFn[] = input.required ? [Validators.required] : [];
      switch (input.validator) {
        case 'email':
          validator.push(Validators.email);
          break;
        default:
          break;
      }
      group[input.key] =
        validator.length > 0
          ? new FormControl(input.value || '', validator)
          : new FormControl(input.value || '');
    });
    console.log(group);

    return new FormGroup(group);
  }

  createFormField(controlType: string, key: string, label: string, required: boolean) {
    const input: FormField<string> = new FormField<string>({
      controlType,
      key,
      label,
      required,
    });

    return input;
  }
}
