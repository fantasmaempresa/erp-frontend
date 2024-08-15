import { TestBed } from '@angular/core/testing';

import { MovementTrackingService } from './movement-tracking.service';

describe('MovementTrackingService', () => {
  let service: MovementTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
