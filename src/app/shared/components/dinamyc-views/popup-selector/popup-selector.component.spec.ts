import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectorComponent } from './popup-selector.component';

describe('PopupSelectorComponent', () => {
  let component: PopupSelectorComponent;
  let fixture: ComponentFixture<PopupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
