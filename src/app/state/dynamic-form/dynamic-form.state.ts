import { Formfield } from '../../data/models/Formfield.model';

export interface DynamicFormState {
  id: number;
  name: string;
  formFields: Formfield<any>[];
  errorMessage: string;
  isEditable: boolean;
  status: 'EDITABLE' | 'NEW';
}

export const dynamicFormInitialState: DynamicFormState = {
  id: 0,
  name: '',
  formFields: [],
  errorMessage: '',
  isEditable: true,
  status: 'NEW',
};
