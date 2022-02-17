import { Action, createReducer, on } from '@ngrx/store';
import { dynamicFormInitialState, DynamicFormState } from './dynamic-form.state';
import * as DynamicFormActions from './dynamic-form.actions';

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
