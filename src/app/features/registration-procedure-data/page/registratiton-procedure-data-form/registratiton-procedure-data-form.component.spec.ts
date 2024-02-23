import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistratitonProcedureDataFormComponent } from './registratiton-procedure-data-form.component';

describe('RegistratitonProcedureDataFormComponent', () => {
  let component: RegistratitonProcedureDataFormComponent;
  let fixture: ComponentFixture<RegistratitonProcedureDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistratitonProcedureDataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistratitonProcedureDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
