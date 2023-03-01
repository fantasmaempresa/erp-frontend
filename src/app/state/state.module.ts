import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { reducers } from './index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { UsersEffects } from './users/users.effects';
import { StaffEffects } from './staff/staff.effects';
import { AreasEffects } from './areas/areas.effects';
import { ConceptsEffects } from './concepts/concepts.effects';
import { QuoteStatusEffects } from './quote-status/quote-status.effects';
import { QuotesEffects } from './quotes/quotes.effects';
import { NotificationEffects } from './notifications/notification.effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { DynamicFormEffects } from './dynamic-form/dynamic-form.effects';
import { ClientsLinkEffects } from './clients-link/clients-link.effects';
import { ClientsEffects } from './clients/clients.effects';
import { QuoteTemplateEffects } from './quote-template/quote-template.effects';
import { ProcessPhaseEffects } from './process-phase/process-phase.effects';
import { ProjectEffects } from './project/project.effects';
import { ProcessEffects } from './process/process.effects';
import { RoleEffects } from './role/role.effects';
import { MyProjectEffects } from './my-project/my-project.effects';

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
