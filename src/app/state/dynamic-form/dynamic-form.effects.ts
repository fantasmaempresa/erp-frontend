import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class DynamicFormEffects {
  constructor(private readonly actions$: Actions) {}
}
