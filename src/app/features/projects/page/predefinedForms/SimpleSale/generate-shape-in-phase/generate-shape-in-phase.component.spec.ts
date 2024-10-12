import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateShapeInPhaseComponent } from './generate-shape-in-phase.component';

describe('GenerateShapeInPhaseComponent', () => {
  let component: GenerateShapeInPhaseComponent;
  let fixture: ComponentFixture<GenerateShapeInPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateShapeInPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateShapeInPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
