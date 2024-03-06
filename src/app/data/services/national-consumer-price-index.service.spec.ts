import { TestBed } from '@angular/core/testing';

import { NationalConsumerPriceIndexService } from './national-consumer-price-index.service';

describe('NationalConsumerPriceIndexService', () => {
  let service: NationalConsumerPriceIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalConsumerPriceIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
