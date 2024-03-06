import { TestBed } from '@angular/core/testing';

import { InversionUnitService } from './inversion-unit.service';

describe('InversionUnitService', () => {
  let service: InversionUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InversionUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
