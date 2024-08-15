import { TestBed } from '@angular/core/testing';

import { GeneralTemplateService } from './general-template.service';

describe('GeneralTemplateService', () => {
  let service: GeneralTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
