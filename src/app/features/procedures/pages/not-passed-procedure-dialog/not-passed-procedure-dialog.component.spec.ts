import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPassedProcedureDialogComponent } from './not-passed-procedure-dialog.component';

describe('NotPassedProcedureDialogComponent', () => {
  let component: NotPassedProcedureDialogComponent;
  let fixture: ComponentFixture<NotPassedProcedureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotPassedProcedureDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotPassedProcedureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
