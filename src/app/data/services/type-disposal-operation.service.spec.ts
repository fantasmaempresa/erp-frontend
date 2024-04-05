import { TestBed } from '@angular/core/testing';

import { TypeDisposalOperationService } from './type-disposal-operation.service';

describe('TypeDisposalOperationService', () => {
  let service: TypeDisposalOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDisposalOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
