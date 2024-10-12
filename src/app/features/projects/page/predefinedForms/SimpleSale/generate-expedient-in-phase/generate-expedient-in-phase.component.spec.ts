import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateExpedientInPhaseComponent } from './generate-expedient-in-phase.component';

describe('GenerateExpedientInPhaseComponent', () => {
  let component: GenerateExpedientInPhaseComponent;
  let fixture: ComponentFixture<GenerateExpedientInPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateExpedientInPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateExpedientInPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
