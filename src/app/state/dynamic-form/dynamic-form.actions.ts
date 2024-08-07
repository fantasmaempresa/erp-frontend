import { createAction, props } from '@ngrx/store';
import { Formfield } from '../../data/dto';
import { Update } from '@ngrx/entity';

export enum DynamicFormActions {
  LOAD_FORM = '[Dynamic Form] Load form',
  LOAD_FORM_SUCCESS = '[Dynamic Form] Load form success',
  SET_FIELD = '[Dynamic Form] Set field',
  UPDATE_FIELD = '[Dynamic Form] Update field',
  UPDATE_VALUES = '[Dynamic Form] Starting update values',
  UPDATE_VALUES_SUCCESS = '[Dynamic Form] Updated values',
  SET_VALUES_TO_FIELDS = '[Dynamic Form] Set value to fields',
  CHANGE_STATUS = '[Dynanic Form] Change status',
  REMOVE_FIELD = '[Dynamic Form] Removing field',
  EMPTY_FORM = '[Dynamic Form] Empty form',
  CLEAR_ERROR = '[Dynamic Form] Clear error',
}

export const loadForm = createAction(
  DynamicFormActions.LOAD_FORM,
  props<{
    form: Formfield<any>[];
    id: number;
    name: string;
    description: string;
  }>(),
);
export const loadFormSuccess = createAction(
  DynamicFormActions.LOAD_FORM_SUCCESS,
  props<{ formFields: Formfield<string>[] }>(),
);
export const setField = createAction(
  DynamicFormActions.SET_FIELD,
  props<{ form: Formfield<any> }>(),
);
export const updateField = createAction(
  DynamicFormActions.UPDATE_FIELD,
  props<{ form: Update<Formfield<any>> }>(),
);
export const updateValues = createAction(
  DynamicFormActions.UPDATE_VALUES,
  props<{ form: Update<Formfield<any>>[] }>(),
);
export const updateValuesSuccess = createAction(
  DynamicFormActions.UPDATE_VALUES_SUCCESS,
  props<{ form: Update<Formfield<any>>[] }>(),
);
export const setValuesToFields = createAction(
  DynamicFormActions.SET_VALUES_TO_FIELDS,
  props<{ fields: any }>(),
);
export const removeField = createAction(
  DynamicFormActions.REMOVE_FIELD,
  props<{ payload: Formfield<any> }>(),
);
export const changeStatus = createAction(
  DynamicFormActions.CHANGE_STATUS,
  props<{ status: 'NEW' | 'EDITABLE' }>(),
);

export const clearError = createAction(DynamicFormActions.CLEAR_ERROR);

export const emptyForm = createAction(DynamicFormActions.EMPTY_FORM);
