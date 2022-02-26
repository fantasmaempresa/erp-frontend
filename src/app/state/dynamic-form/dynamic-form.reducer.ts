import { Action, createReducer, on } from '@ngrx/store';
import { dynamicFormInitialState, DynamicFormState } from './dynamic-form.state';
import * as DynamicFormActions from './dynamic-form.actions';
import { Formfield } from '../../data/models/Formfield.model';

const DynamicFormReducer = createReducer(
  dynamicFormInitialState,
  on(DynamicFormActions.loadForm, (state, actions): DynamicFormState => {
    return {
      ...state,
      id: actions.id,
      name: actions.name,
      formFields: [...actions.form, ...state.formFields],
    };
  }),
  on(DynamicFormActions.setField, (state, actions) => {
    let index = state.formFields.findIndex((el) => el.key === actions.form.key);
    if (index === -1) {
      return {
        ...state,
        formFields: [actions.form, ...state.formFields],
        errorMessage: '',
      };
    }
    return {
      ...state,
      errorMessage: `Ya hay un campo creado con la etiqueta ${actions.form.key}`,
    };
  }),
  on(DynamicFormActions.setValuesToFields, (state, { fields }) => {
    let newState: Formfield<any>[] = [];
    for (const field in fields) {
      for (const item of state.formFields) {
        if (item.key === field) {
          newState = [...newState, { ...item, value: fields[field] }];
        }
      }
    }
    return {
      ...state,
      formFields: newState,
    };
  }),
  on(DynamicFormActions.changeStatus, (state, { status }) => {
    return {
      ...state,
      status,
    };
  }),
  on(DynamicFormActions.removeField, (state, actions) => {
    return {
      ...state,
      formFields: state.formFields.filter((item) => item.key !== actions.payload.key),
    };
  }),
  on(DynamicFormActions.emptyForm, (): DynamicFormState => {
    return dynamicFormInitialState;
  }),
);

export function dynamicFormReducer(state = dynamicFormInitialState, action: Action) {
  return DynamicFormReducer(state, action);
}
