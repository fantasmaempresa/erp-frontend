import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Formfield } from '../../data/dto/Formfield.dto';

@Injectable({
  providedIn: 'root',
})
export class FormfieldControlService {
  toFormGroup(inputs: Formfield<any>[]): UntypedFormGroup {
    const group: any = {};
    inputs.forEach((input) => {
      let validator: ValidatorFn[] = input.required
        ? [Validators.required]
        : [];
      switch (input.validator) {
        case 'email':
          validator.push(Validators.email);
          break;
        default:
          break;
      }
      group[input.key] =
        validator.length > 0
          ? new UntypedFormControl('', validator)
          : new UntypedFormControl('');
    });

    return new UntypedFormGroup(group);
  }
}
