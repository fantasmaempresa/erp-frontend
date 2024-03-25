import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingIncomeCommentFormComponent } from './processing-income-comment-form.component';

describe('ProcessingIncomeCommentFormComponent', () => {
  let component: ProcessingIncomeCommentFormComponent;
  let fixture: ComponentFixture<ProcessingIncomeCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingIncomeCommentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingIncomeCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
