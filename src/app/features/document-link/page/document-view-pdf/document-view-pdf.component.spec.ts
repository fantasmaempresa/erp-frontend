import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentViewPdfComponent } from './document-view-pdf.component';

describe('DocumentViewPdfComponent', () => {
  let component: DocumentViewPdfComponent;
  let fixture: ComponentFixture<DocumentViewPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentViewPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
