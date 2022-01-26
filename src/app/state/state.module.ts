import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { ClientsEffects } from './clients/clients.effects';
import { StaffEffects } from './staff/staff.effects';
import { AreasEffects } from './areas/areas.effects';
import { ConceptsEffects } from './concepts/concepts.effects';
import { QuoteStatusEffects } from './quote-status/quote-status.effects';
import { QuotesEffects } from './quotes/quotes.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      ClientsEffects,
      StaffEffects,
      AreasEffects,
      ConceptsEffects,
      QuoteStatusEffects,
      QuotesEffects,
    ]),
    StoreDevtoolsModule.instrument({ name: 'ERP', maxAge: 25, logOnly: environment.production }),
  ],
})
export class StateModule {}
