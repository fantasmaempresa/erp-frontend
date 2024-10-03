import { TestBed } from '@angular/core/testing';

import { ProjectActionEventService } from './project-action-event.service';

describe('ProjectActionEventService', () => {
  let service: ProjectActionEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectActionEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
