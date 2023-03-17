import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { reducers } from './index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth';
import { UsersEffects } from './users';
import { StaffEffects } from './staff';
import { AreasEffects } from './areas';
import { ConceptsEffects } from './concepts';
import { QuoteStatusEffects } from './quote-status';
import { QuotesEffects } from './quotes';
import { NotificationEffects } from './notifications';
import { localStorageSync } from 'ngrx-store-localstorage';
import { DynamicFormEffects } from './dynamic-form/dynamic-form.effects';
import { ClientsLinkEffects } from './clients-link';
import { ClientsEffects } from './clients';
import { QuoteTemplateEffects } from './quote-template';
import { ProcessPhaseEffects } from './process-phase';
import { ProjectEffects } from './project';
import { ProcessEffects } from './process';
import { RoleEffects } from './role';
import { MyProjectEffects } from './my-project';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return localStorageSync({
    keys: [{ auth: ['tokens', 'user'] }],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      UsersEffects,
      ClientsEffects,
      StaffEffects,
      AreasEffects,
      ConceptsEffects,
      QuoteStatusEffects,
      QuotesEffects,
      NotificationEffects,
      DynamicFormEffects,
      ClientsLinkEffects,
      ProcessPhaseEffects,
      ProcessEffects,
      ProjectEffects,
      RoleEffects,
      QuoteTemplateEffects,
      MyProjectEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'ERP',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class StateModule {}
