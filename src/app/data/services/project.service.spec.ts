import { TestBed } from '@angular/core/testing';

import { ProjectServiceOld } from './project.service';

describe('ProjectService', () => {
  let service: ProjectServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
