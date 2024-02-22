import { TestBed } from '@angular/core/testing';

import { IsoDocumentationService } from './iso-documentation.service';

describe('IsoDocumentationService', () => {
  let service: IsoDocumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsoDocumentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
