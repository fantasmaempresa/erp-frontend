import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresFormComponent } from './procedures-form.component';

describe('ProceduresFormComponent', () => {
  let component: ProceduresFormComponent;
  let fixture: ComponentFixture<ProceduresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceduresFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceduresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
