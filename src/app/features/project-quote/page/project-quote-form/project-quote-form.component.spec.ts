import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuoteFormComponent } from './project-quote-form.component';

describe('ProjectQuoteFormComponent', () => {
  let component: ProjectQuoteFormComponent;
  let fixture: ComponentFixture<ProjectQuoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectQuoteFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
