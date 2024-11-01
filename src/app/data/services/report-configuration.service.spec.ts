import { TestBed } from '@angular/core/testing';

import { ReportConfigurationService } from './report-configuration.service';

describe('ReportConfigurationService', () => {
  let service: ReportConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
