import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPhaseFormComponent } from './process-phase-form.component';

describe('ProcessPhaseFormComponent', () => {
  let component: ProcessPhaseFormComponent;
  let fixture: ComponentFixture<ProcessPhaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessPhaseFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPhaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
