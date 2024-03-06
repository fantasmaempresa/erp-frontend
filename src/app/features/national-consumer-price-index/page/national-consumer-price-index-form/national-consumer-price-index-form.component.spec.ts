import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalConsumerPriceIndexFormComponent } from './national-consumer-price-index-form.component';

describe('NationalConsumerPriceIndexFormComponent', () => {
  let component: NationalConsumerPriceIndexFormComponent;
  let fixture: ComponentFixture<NationalConsumerPriceIndexFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalConsumerPriceIndexFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalConsumerPriceIndexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
