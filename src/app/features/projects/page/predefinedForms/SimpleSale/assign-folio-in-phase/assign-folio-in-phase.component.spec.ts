import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFolioInPhaseComponent } from './assign-folio-in-phase.component';

describe('AssignFolioInPhaseComponent', () => {
  let component: AssignFolioInPhaseComponent;
  let fixture: ComponentFixture<AssignFolioInPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignFolioInPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFolioInPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
