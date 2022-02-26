import { TestBed } from '@angular/core/testing';

import { TemplateQuotesService } from './template-quotes.service';

describe('TemplateQuotesService', () => {
  let service: TemplateQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
