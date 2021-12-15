import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStatusFormComponent } from './quote-status-form.component';

describe('QuoteStatusFormComponent', () => {
  let component: QuoteStatusFormComponent;
  let fixture: ComponentFixture<QuoteStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteStatusFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
