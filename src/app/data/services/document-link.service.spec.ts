import { TestBed } from '@angular/core/testing';

import { DocumentLinkService } from './document-link.service';

describe('DocumentLinkService', () => {
  let service: DocumentLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
