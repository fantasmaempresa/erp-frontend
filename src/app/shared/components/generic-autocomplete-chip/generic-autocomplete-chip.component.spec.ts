import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAutocompleteChipComponent } from './generic-autocomplete-chip.component';

describe('GenericAutocompleteChipComponent', () => {
  let component: GenericAutocompleteChipComponent;
  let fixture: ComponentFixture<GenericAutocompleteChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericAutocompleteChipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericAutocompleteChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
