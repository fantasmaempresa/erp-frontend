import { TestBed } from '@angular/core/testing';

import { ClientLinkService } from './client-link.service';

describe('ClientLinkService', () => {
  let service: ClientLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
