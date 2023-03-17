import { TestBed } from '@angular/core/testing';

import { ConceptServiceOld } from './concept.service';

describe('ConceptService', () => {
  let service: ConceptServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
