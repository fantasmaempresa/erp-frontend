import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateVulnerableOperationInPhaseComponent } from './generate-vulnerable-operation-in-phase.component';

describe('GenerateVulnerableOperationInPhaseComponent', () => {
  let component: GenerateVulnerableOperationInPhaseComponent;
  let fixture: ComponentFixture<GenerateVulnerableOperationInPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateVulnerableOperationInPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateVulnerableOperationInPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
