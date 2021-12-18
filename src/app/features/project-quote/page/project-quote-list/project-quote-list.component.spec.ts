import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuoteListComponent } from './project-quote-list.component';

describe('ProjectQuoteListComponent', () => {
  let component: ProjectQuoteListComponent;
  let fixture: ComponentFixture<ProjectQuoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectQuoteListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
