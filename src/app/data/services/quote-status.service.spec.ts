import { TestBed } from '@angular/core/testing';

import { QuoteStatusService } from './quote-status.service';

describe('QuoteStatusService', () => {
  let service: QuoteStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
