import { createAction, props } from '@ngrx/store';
import { Formfield } from '../../data/models/Formfield.model';
import { FormGroup } from '@angular/forms';

export enum DynamicFormActions {
  LOAD_FORM = '[Dynamic Form] Load form',
  LOAD_FORM_SUCCESS = '[Dynamic Form] Load form success',
  SET_FIELD = '[Dynamic Form] Set field',
  REMOVE_FIELD = '[Dynamic Form] Removing field',
  EMPTY_FORM = '[Dynamic Form] Empty form',
}

export const loadForm = createAction(DynamicFormActions.LOAD_FORM, props<{ form: FormGroup }>());
export const loadFormSuccess = createAction(
  DynamicFormActions.LOAD_FORM_SUCCESS,
  props<{ formFields: Formfield<string>[] }>(),
);
export const setField = createAction(
  DynamicFormActions.SET_FIELD,
  props<{ form: Formfield<any> }>(),
);
export const removeField = createAction(
  DynamicFormActions.REMOVE_FIELD,
  props<{ form: Formfield<string> }>(),
);
