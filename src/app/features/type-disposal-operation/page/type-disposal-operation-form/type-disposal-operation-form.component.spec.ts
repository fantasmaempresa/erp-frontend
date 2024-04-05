import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDisposalOperationFormComponent } from './type-disposal-operation-form.component';

describe('TypeDisposalOperationFormComponent', () => {
  let component: TypeDisposalOperationFormComponent;
  let fixture: ComponentFixture<TypeDisposalOperationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDisposalOperationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeDisposalOperationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
