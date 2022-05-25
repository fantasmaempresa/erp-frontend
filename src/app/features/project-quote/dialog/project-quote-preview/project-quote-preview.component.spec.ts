import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuotePreviewComponent } from './project-quote-preview.component';

describe('ProjectQuotePreviewComponent', () => {
  let component: ProjectQuotePreviewComponent;
  let fixture: ComponentFixture<ProjectQuotePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectQuotePreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuotePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
