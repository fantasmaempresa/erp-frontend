import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DynamicFormState } from './dynamic-form.state';

const selectFormState = createFeatureSelector<DynamicFormState>('dynamicForm');

export const selectDynamicForm = createSelector(selectFormState, (state) => {
  return state.formFields;
});

export const selectFormGroup = createSelector(selectFormState, (state) => {
  return state.formGroup;
});
