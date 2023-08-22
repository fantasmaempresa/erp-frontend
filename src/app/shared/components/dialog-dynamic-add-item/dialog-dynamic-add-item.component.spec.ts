import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDynamicAddItemComponent } from './dialog-dynamic-add-item.component';

describe('DialogDynamicAddItemComponent', () => {
  let component: DialogDynamicAddItemComponent;
  let fixture: ComponentFixture<DialogDynamicAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDynamicAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDynamicAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
