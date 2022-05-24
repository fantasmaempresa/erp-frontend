import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFormBuilderComponent } from './preview-form-builder.component';

describe('PreviewFormBuilderComponent', () => {
  let component: PreviewFormBuilderComponent;
  let fixture: ComponentFixture<PreviewFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewFormBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
