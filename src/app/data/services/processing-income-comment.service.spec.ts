import { TestBed } from '@angular/core/testing';

import { ProcessingIncomeCommentService } from './processing-income-comment.service';

describe('ProcessingIncomeCommentService', () => {
  let service: ProcessingIncomeCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingIncomeCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
