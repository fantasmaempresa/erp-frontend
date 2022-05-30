import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildProjectComponent } from './build-project.component';

describe('BuildProjectComponent', () => {
  let component: BuildProjectComponent;
  let fixture: ComponentFixture<BuildProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
