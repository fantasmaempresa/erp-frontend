import { Action, createReducer, on } from '@ngrx/store';
import { dynamicFormAdapter, DynamicFormState, initialState } from './dynamic-form.state';
import * as DynamicFormActions from './dynamic-form.actions';

const DynamicFormReducer = createReducer(
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
  on(DynamicFormActions.changeStatus, (state, { status }) => {
    return {
      ...state,
      status,
    };
  }),
  on(DynamicFormActions.removeField, (state, actions) => {
    return dynamicFormAdapter.removeOne(actions.payload.id, state);
  }),
  on(DynamicFormActions.emptyForm, (): DynamicFormState => {
    return initialState;
  }),
);

export function dynamicFormReducer(state = initialState, action: Action) {
  return DynamicFormReducer(state, action);
}
