import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGrantorsComponent } from './dialog-grantors.component';

describe('DialogGrantorsComponent', () => {
  let component: DialogGrantorsComponent;
  let fixture: ComponentFixture<DialogGrantorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGrantorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGrantorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
