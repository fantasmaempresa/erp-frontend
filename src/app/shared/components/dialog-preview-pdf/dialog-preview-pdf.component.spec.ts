import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewPdfComponent } from './dialog-preview-pdf.component';

describe('DialogPreviewPdfComponent', () => {
  let component: DialogPreviewPdfComponent;
  let fixture: ComponentFixture<DialogPreviewPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPreviewPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPreviewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
