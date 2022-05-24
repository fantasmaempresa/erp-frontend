import { TestBed } from '@angular/core/testing';

import { QuoteTemplateService } from './quote-template.service';

describe('TemplateQuotesService', () => {
  let service: QuoteTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
