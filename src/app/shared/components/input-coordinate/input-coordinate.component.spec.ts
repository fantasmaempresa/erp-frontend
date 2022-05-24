import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCoordinateComponent } from './input-coordinate.component';

describe('InputCoordinateComponent', () => {
  let component: InputCoordinateComponent;
  let fixture: ComponentFixture<InputCoordinateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCoordinateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCoordinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
