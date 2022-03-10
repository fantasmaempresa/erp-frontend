import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLinkFormComponent } from './client-link-form.component';

describe('ClientLinkFormComponent', () => {
  let component: ClientLinkFormComponent;
  let fixture: ComponentFixture<ClientLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLinkFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
