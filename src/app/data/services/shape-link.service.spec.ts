import { TestBed } from '@angular/core/testing';

import { ShapeLinkServiceService } from './shape-link-service.service';

describe('ShapeLinkServiceService', () => {
  let service: ShapeLinkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeLinkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
