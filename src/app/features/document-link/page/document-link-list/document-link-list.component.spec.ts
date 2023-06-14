import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLinkListComponent } from './document-link-list.component';

describe('DocumentLinkListComponent', () => {
  let component: DocumentLinkListComponent;
  let fixture: ComponentFixture<DocumentLinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentLinkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
