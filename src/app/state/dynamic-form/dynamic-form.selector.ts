import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DynamicFormState } from './dynamic-form.state';

const selectFormState = createFeatureSelector<DynamicFormState>('dynamicForm');

export const selectDynamicForm = createSelector(selectFormState, (state) => {
  return state.formFields;
});

export const selectDynamicFormId = createSelector(selectFormState, (state) => {
  return state.id;
});

export const selectDynamicFormName = createSelector(selectFormState, (state) => {
  return state.name;
});

export const selectErrorMessage = createSelector(selectFormState, (state) => {
  return state.errorMessage;
});

export const selectIsEditable = createSelector(selectFormState, (state) => {
  return state.isEditable;
});
