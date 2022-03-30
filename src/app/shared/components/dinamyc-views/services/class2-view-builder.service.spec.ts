import { TestBed } from '@angular/core/testing';

import { Class2ViewBuilderService } from './class2-view-builder.service';

describe('Class2ViewBuilderService', () => {
  let service: Class2ViewBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Class2ViewBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
