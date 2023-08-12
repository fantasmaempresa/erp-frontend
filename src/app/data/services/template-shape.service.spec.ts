import { TestBed } from '@angular/core/testing';

import { TemplateShapeService } from './template-shape.service';

describe('TemplateShapeService', () => {
  let service: TemplateShapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateShapeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
