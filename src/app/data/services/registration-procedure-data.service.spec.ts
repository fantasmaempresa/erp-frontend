import { TestBed } from '@angular/core/testing';

import { RegistrationProcedureDataService } from './registration-procedure-data.service';

describe('RegistrationProcedureDataService', () => {
  let service: RegistrationProcedureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationProcedureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
