import { TestBed } from '@angular/core/testing';

import { AreaServiceOld } from './area.service';

describe('AreaService', () => {
  let service: AreaServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
