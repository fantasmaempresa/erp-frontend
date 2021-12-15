import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStatusListComponent } from './quote-status-list.component';

describe('QuoteStatusListComponent', () => {
  let component: QuoteStatusListComponent;
  let fixture: ComponentFixture<QuoteStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteStatusListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
