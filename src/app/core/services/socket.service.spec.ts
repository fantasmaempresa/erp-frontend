import { TestBed } from '@angular/core/testing';

import { NotificationSocketService } from './notification-socket.service';

describe('SocketService', () => {
  let service: NotificationSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
