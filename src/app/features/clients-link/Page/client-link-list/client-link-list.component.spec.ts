import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLinkListComponent } from './client-link-list.component';

describe('ClientLinkListComponent', () => {
  let component: ClientLinkListComponent;
  let fixture: ComponentFixture<ClientLinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLinkListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
