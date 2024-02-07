import { TestBed } from '@angular/core/testing';

import { ProcedureCommentService } from './procedure-comment.service';

describe('ProcedureCommentService', () => {
  let service: ProcedureCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedureCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
