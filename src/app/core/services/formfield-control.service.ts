import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Formfield } from '../../data/dto/Formfield.dto';

@Injectable({
  providedIn: 'root',
})
export class FormfieldControlService {
  toFormGroup(inputs: Formfield<any>[]): FormGroup {
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
          ? new FormControl('', validator)
          : new FormControl('');
    });

    return new FormGroup(group);
  }
}
