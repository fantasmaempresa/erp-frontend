import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuotePageComponent } from './project-quote-page.component';

describe('ProjectQuotePageComponent', () => {
  let component: ProjectQuotePageComponent;
  let fixture: ComponentFixture<ProjectQuotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectQuotePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
