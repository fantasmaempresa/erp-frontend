import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuoteTemplate } from 'src/app/data/models/QuoteTemplate.model';
import { dynamicFormAdapter, DynamicFormState } from './dynamic-form.state';

const selectFormState = createFeatureSelector<DynamicFormState>('dynamicForm');
export const dynamicFormSelectors = dynamicFormAdapter.getSelectors();

export const selectDynamicForm = createSelector(selectFormState, dynamicFormSelectors.selectAll);

export const selectDynamicFormEssentialData = createSelector(
  selectFormState,
  (state: DynamicFormState) => {
    return {
      form: dynamicFormSelectors.selectAll(state),
      name: state.name,
      description: state.description,
      id: state.id,
    };
  },
);

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

export const selectFormToOperations = (template: QuoteTemplate) =>
  createSelector(selectFormState, (state) => {
    let form = dynamicFormSelectors.selectAll(state);
    form.forEach((field) => {
      if (field.key !== 'total') {
        template.operations.operation_fields.map((x: any) => {
          if (x.key === field.key) {
            x.value = field.value;
            return {
              ...x,
              value: field.value,
            };
          } else {
            return x;
          }
        });
      }
    });
    return {
      quote: {
        form: {
          ...form,
        },
        operations: template.operations,
      },
    };
  });

export const selectIsEditable = createSelector(selectFormState, (state) => state.isEditable);
