import { NgModule } from '@angular/core';

import { QuoteStatusRoutingModule } from './quote-status-routing.module';
import { QuoteStatusFormComponent } from './page/quote-status-form/quote-status-form.component';
import { QuoteStatusListComponent } from './page/quote-status-list/quote-status-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [QuoteStatusFormComponent, QuoteStatusListComponent],
  imports: [SharedModule, QuoteStatusRoutingModule],
})
export class QuoteStatusModule {}
