import { TestBed } from '@angular/core/testing';

import { RoleServiceOld } from './role.service';

describe('RolesService', () => {
  let service: RoleServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
