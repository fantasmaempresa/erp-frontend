import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDataInPhaseComponent } from './registration-data-in-phase.component';

describe('RegistrationDataInPhaseComponent', () => {
  let component: RegistrationDataInPhaseComponent;
  let fixture: ComponentFixture<RegistrationDataInPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationDataInPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationDataInPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
