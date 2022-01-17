import { TestBed } from '@angular/core/testing';

import { ProjectQuoteService } from './project-quote.service';

describe('ProjectQuoteService', () => {
  let service: ProjectQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
