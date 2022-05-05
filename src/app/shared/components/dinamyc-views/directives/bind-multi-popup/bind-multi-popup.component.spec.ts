import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindMultiPopupComponent } from './bind-multi-popup.component';

describe('BindMultiPopupComponent', () => {
  let component: BindMultiPopupComponent;
  let fixture: ComponentFixture<BindMultiPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BindMultiPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BindMultiPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
