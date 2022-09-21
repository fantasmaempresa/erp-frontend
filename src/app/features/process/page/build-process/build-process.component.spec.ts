import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildProcessComponent } from './build-process.component';

describe('BuildProcessComponent', () => {
  let component: BuildProcessComponent;
  let fixture: ComponentFixture<BuildProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildProcessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
