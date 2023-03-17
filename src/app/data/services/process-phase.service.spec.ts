import { TestBed } from '@angular/core/testing';

import { ProcessPhaseServiceOld } from './process-phase.service';

describe('ProcessPhaseService', () => {
  let service: ProcessPhaseServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessPhaseServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
