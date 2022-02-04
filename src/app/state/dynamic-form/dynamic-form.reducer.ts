import { Action, createReducer, on } from '@ngrx/store';
import { dynamicFormInitialState } from './dynamic-form.state';
import * as DynamicFormActions from './dynamic-form.actions';

const DynamicFormReducer = createReducer(
  dynamicFormInitialState,
  on(DynamicFormActions.loadForm, (state, actions) => {
    return {
      ...state,
      formGroup: actions.form,
    };
  }),
  on(DynamicFormActions.setField, (state, actions) => {
    return {
      ...state,
      formFields: [...state.formFields, actions.form],
    };
  }),
);

export function dynamicFormReducer(state = dynamicFormInitialState, action: Action) {
  return DynamicFormReducer(state, action);
}
