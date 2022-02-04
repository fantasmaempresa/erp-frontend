import { Formfield } from '../../data/models/Formfield.model';
import { FormGroup } from '@angular/forms';

export interface DynamicFormState {
  formGroup: FormGroup;
  formFields: Formfield<any>[];
}

export const dynamicFormInitialState: DynamicFormState = {
  formGroup: new FormGroup({}),
  formFields: [],
};
