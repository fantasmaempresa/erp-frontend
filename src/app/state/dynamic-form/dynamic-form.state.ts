import { Formfield } from '../../data/dto/Formfield.dto';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface DynamicFormState extends EntityState<Formfield<any>> {
  id: number;
  name: string;
  description: string;
  errorMessage: string;
  isEditable: boolean;
  status: 'EDITABLE' | 'NEW';
}

export const dynamicFormAdapter = createEntityAdapter<Formfield<any>>({
  selectId: (field) => field.key,
});

export const initialState: DynamicFormState =
  dynamicFormAdapter.getInitialState({
    id: 0,
    name: '',
    description: '',
    errorMessage: '',
    isEditable: false,
    status: 'NEW',
  });

// export const dynamicFormInitialState: DynamicFormState = {
//   id: 0,
//   name: '',
//   formFields: [],
//   errorMessage: '',
//   isEditable: true,
//   status: 'NEW',
// };
