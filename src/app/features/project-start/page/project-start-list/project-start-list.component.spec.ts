import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStartListComponent } from './project-start-list.component';

describe('ProjectStartListComponent', () => {
  let component: ProjectStartListComponent;
  let fixture: ComponentFixture<ProjectStartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStartListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
