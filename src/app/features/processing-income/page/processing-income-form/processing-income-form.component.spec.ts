import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingIncomeFormComponent } from './processing-income-form.component';

describe('ProcessingIncomeFormComponent', () => {
  let component: ProcessingIncomeFormComponent;
  let fixture: ComponentFixture<ProcessingIncomeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingIncomeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingIncomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
