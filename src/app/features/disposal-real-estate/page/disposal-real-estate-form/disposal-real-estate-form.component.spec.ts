import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalRealEstateFormComponent } from './disposal-real-estate-form.component';

describe('DisposalRealEstateFormComponent', () => {
  let component: DisposalRealEstateFormComponent;
  let fixture: ComponentFixture<DisposalRealEstateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalRealEstateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposalRealEstateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
