import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionUnitFormComponent } from './inversion-unit-form.component';

describe('InversionUnitFormComponent', () => {
  let component: InversionUnitFormComponent;
  let fixture: ComponentFixture<InversionUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InversionUnitFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InversionUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
