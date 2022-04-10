import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptFormDialogComponent } from './concept-form-dialog.component';

describe('ConceptFormDialogComponent', () => {
  let component: ConceptFormDialogComponent;
  let fixture: ComponentFixture<ConceptFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConceptFormDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
