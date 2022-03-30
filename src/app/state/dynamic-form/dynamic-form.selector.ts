import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dynamicFormAdapter, DynamicFormState } from './dynamic-form.state';

const selectFormState = createFeatureSelector<DynamicFormState>('dynamicForm');
export const dynamicFormSelectors = dynamicFormAdapter.getSelectors();

export const selectDynamicForm = createSelector(selectFormState, dynamicFormSelectors.selectAll);

export const selectDynamicFormId = createSelector(selectFormState, (state) => {
  return state.id;
});

export const selectDynamicFormName = createSelector(selectFormState, (state) => {
  return state.name;
});

export const selectErrorMessage = createSelector(selectFormState, (state) => {
  return state.errorMessage;
});

export const selectStatus = createSelector(selectFormState, (state) => {
  return state.status;
});
