import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormCreationComponent } from './dynamic-form-creation.component';

describe('DynamicFormCreationComponent', () => {
  let component: DynamicFormCreationComponent;
  let fixture: ComponentFixture<DynamicFormCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormCreationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
