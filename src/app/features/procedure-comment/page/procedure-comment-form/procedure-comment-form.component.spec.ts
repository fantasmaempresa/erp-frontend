import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureCommentFormComponent } from './procedure-comment-form.component';

describe('ProcedureCommentFormComponent', () => {
  let component: ProcedureCommentFormComponent;
  let fixture: ComponentFixture<ProcedureCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureCommentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
