import { TestBed } from '@angular/core/testing';

import { ProcessingIncomeService } from './processing-income.service';

describe('ProcessingIncomeService', () => {
  let service: ProcessingIncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingIncomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
