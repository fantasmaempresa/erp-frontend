import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignUserComponent } from './dialog-assign-user.component';

describe('DialogAssignUserComponent', () => {
  let component: DialogAssignUserComponent;
  let fixture: ComponentFixture<DialogAssignUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssignUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAssignUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
