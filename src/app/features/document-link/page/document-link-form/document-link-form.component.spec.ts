import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLinkFormComponent } from './document-link-form.component';

describe('DocumentLinkFormComponent', () => {
  let component: DocumentLinkFormComponent;
  let fixture: ComponentFixture<DocumentLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentLinkFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
