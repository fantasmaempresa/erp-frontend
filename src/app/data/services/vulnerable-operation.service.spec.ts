import { TestBed } from '@angular/core/testing';

import { VulnerableOperationService } from './vulnerable-operation.service';

describe('VulnerableOperationService', () => {
  let service: VulnerableOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VulnerableOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
