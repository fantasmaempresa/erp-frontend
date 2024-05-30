import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantorPercentageDialogComponent } from './grantor-percentage-dialog.component';

describe('GrantorPercentageDialogComponent', () => {
  let component: GrantorPercentageDialogComponent;
  let fixture: ComponentFixture<GrantorPercentageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantorPercentageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantorPercentageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
