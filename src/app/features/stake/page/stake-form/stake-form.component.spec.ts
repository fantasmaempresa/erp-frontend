import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeFormComponent } from './stake-form.component';

describe('StakeFormComponent', () => {
  let component: StakeFormComponent;
  let fixture: ComponentFixture<StakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
