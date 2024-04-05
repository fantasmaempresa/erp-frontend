import { TestBed } from '@angular/core/testing';

import { DisposalRealEstateService } from './disposal-real-estate.service';

describe('DisposalRealEstateService', () => {
  let service: DisposalRealEstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposalRealEstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
