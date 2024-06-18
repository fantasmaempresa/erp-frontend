import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantorLinkFormComponent } from './grantor-link-form.component';

describe('GrantorLinkFormComponent', () => {
  let component: GrantorLinkFormComponent;
  let fixture: ComponentFixture<GrantorLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantorLinkFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantorLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
