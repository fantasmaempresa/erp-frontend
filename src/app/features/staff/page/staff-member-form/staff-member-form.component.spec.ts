import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMemberFormComponent } from './staff-member-form.component';

describe('StaffFormComponent', () => {
  let component: StaffMemberFormComponent;
  let fixture: ComponentFixture<StaffMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffMemberFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
