import { TestBed } from '@angular/core/testing';

import { StaffServiceOld } from './staff-service.service';

describe('StaffService', () => {
  let service: StaffServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
