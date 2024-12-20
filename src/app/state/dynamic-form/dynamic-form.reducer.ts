import { createReducer, on } from '@ngrx/store';
import {
  dynamicFormAdapter,
  DynamicFormState,
  initialState,
} from './dynamic-form.state';
import * as DynamicFormActions from './dynamic-form.actions';

export const dynamicFormReducer = createReducer(
  initialState,
  on(DynamicFormActions.loadForm, (state, actions) => {
    return dynamicFormAdapter.setAll(actions.form, {
      ...state,
      id: actions.id,
      name: actions.name,
      description: actions.description,
      isEditable: true,
    });
  }),
  on(DynamicFormActions.setField, (state, actions) => {
    console.log(state.entities);
    if (state.entities[actions.form.key]) {
      return {
        ...state,
        errorMessage: `Ya hay un campo creado con la etiqueta ${actions.form.key}`,
      };
    }
    return dynamicFormAdapter.addOne(actions.form, state);
  }),
  on(DynamicFormActions.updateField, (state, action) => {
    return dynamicFormAdapter.updateOne(action.form, state);
  }),
  on(DynamicFormActions.updateValues, (state, action) => {
    return dynamicFormAdapter.updateMany(action.form, state);
  }),
  on(DynamicFormActions.setValuesToFields, (state, { fields }) => {
    return dynamicFormAdapter.updateMany(fields, state);
  }),
  on(DynamicFormActions.changeStatus, (state, { status }): DynamicFormState => {
    return {
      ...state,
      status,
    };
  }),
  on(DynamicFormActions.removeField, (state, actions) => {
    return dynamicFormAdapter.removeOne(actions.payload.label, state);
  }),
  on(DynamicFormActions.emptyForm, (): DynamicFormState => {
    return initialState;
  }),
  on(DynamicFormActions.clearError, (state): DynamicFormState => {
    return {
      ...state,
      errorMessage: '',
    };
  }),
);
