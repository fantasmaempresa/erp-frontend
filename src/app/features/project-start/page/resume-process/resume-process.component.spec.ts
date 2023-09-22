import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeProcessComponent } from './resume-process.component';

describe('ResumeProcessComponent', () => {
  let component: ResumeProcessComponent;
  let fixture: ComponentFixture<ResumeProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
