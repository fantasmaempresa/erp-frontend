import { TestBed } from '@angular/core/testing';

import { PredefinedFormsProjectsService } from './predefined-forms-projects.service';

describe('PredefinedFormsProjectsService', () => {
  let service: PredefinedFormsProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefinedFormsProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
