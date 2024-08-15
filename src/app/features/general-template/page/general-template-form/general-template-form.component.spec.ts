import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTemplateFormComponent } from './general-template-form.component';

describe('GeneralTemplateFormComponent', () => {
  let component: GeneralTemplateFormComponent;
  let fixture: ComponentFixture<GeneralTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTemplateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
