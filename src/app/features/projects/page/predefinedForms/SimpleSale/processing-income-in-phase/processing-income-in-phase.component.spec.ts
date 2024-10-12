import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingIncomeInPhaseComponent } from './processing-income-in-phase.component';

describe('ProcessingIncomeInPhaseComponent', () => {
  let component: ProcessingIncomeInPhaseComponent;
  let fixture: ComponentFixture<ProcessingIncomeInPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingIncomeInPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingIncomeInPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
