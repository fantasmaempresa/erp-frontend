import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementTrackingFormComponent } from './movement-tracking-form.component';

describe('MovementTrackingFormComponent', () => {
  let component: MovementTrackingFormComponent;
  let fixture: ComponentFixture<MovementTrackingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementTrackingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementTrackingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
