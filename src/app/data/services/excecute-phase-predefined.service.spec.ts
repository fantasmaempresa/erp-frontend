import { TestBed } from '@angular/core/testing';

import { ExcecutePhasePredefinedService } from './excecute-phase-predefined.service';

describe('ExcecutePhasePredefinedService', () => {
  let service: ExcecutePhasePredefinedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcecutePhasePredefinedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
