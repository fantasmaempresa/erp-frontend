import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFilesToProcedureComponent } from './load-files-to-procedure.component';

describe('LoadFilesToProcedureComponent', () => {
  let component: LoadFilesToProcedureComponent;
  let fixture: ComponentFixture<LoadFilesToProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadFilesToProcedureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadFilesToProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
