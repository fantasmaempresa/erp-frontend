import { TestBed } from '@angular/core/testing';

import { GrantorLinkService } from './grantor-link.service';

describe('GrantorLinkService', () => {
  let service: GrantorLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrantorLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
