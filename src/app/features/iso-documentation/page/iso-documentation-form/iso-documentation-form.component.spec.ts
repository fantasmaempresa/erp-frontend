import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsoDocumentationFormComponent } from './iso-documentation-form.component';

describe('IsoDocumentationFormComponent', () => {
  let component: IsoDocumentationFormComponent;
  let fixture: ComponentFixture<IsoDocumentationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsoDocumentationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsoDocumentationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
