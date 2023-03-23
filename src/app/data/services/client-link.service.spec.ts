import { TestBed } from '@angular/core/testing';

import { ClientLinkServiceOld } from './client-link.service';

describe('ClientLinkService', () => {
  let service: ClientLinkServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLinkServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
