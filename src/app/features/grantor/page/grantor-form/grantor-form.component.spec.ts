import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantorFormComponent } from './grantor-form.component';

describe('GrantorFormComponent', () => {
  let component: GrantorFormComponent;
  let fixture: ComponentFixture<GrantorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
