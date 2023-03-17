import { TestBed } from '@angular/core/testing';

import { ClientServiceOld } from './client.service';

describe('ClientService', () => {
  let service: ClientServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
