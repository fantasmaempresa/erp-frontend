import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuoteConceptsComponent } from './project-quote-concepts.component';

describe('ProjectQuoteConceptsComponent', () => {
  let component: ProjectQuoteConceptsComponent;
  let fixture: ComponentFixture<ProjectQuoteConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectQuoteConceptsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuoteConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
