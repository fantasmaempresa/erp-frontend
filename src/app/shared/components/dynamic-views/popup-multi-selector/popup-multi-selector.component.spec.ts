import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMultiSelectorComponent } from './popup-multi-selector.component';

describe('PopupSelectorComponent', () => {
  let component: PopupMultiSelectorComponent;
  let fixture: ComponentFixture<PopupMultiSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupMultiSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
