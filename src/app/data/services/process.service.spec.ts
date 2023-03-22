import { TestBed } from '@angular/core/testing';

import { ProcessServiceOld } from './process.service';

describe('ProcessService', () => {
  let service: ProcessServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
