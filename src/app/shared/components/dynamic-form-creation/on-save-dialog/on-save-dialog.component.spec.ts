import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSaveDialogComponent } from './on-save-dialog.component';

describe('OnSaveDialogComponent', () => {
  let component: OnSaveDialogComponent;
  let fixture: ComponentFixture<OnSaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnSaveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
