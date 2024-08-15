import { TestBed } from '@angular/core/testing';

import { OfficeSecurityMeasuresService } from './office-security-measures.service';

describe('OfficeSecurityMeasuresService', () => {
  let service: OfficeSecurityMeasuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeSecurityMeasuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
