import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPhaseListComponent } from './process-phase-list.component';

describe('ProcessPhaseListComponent', () => {
  let component: ProcessPhaseListComponent;
  let fixture: ComponentFixture<ProcessPhaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessPhaseListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPhaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
