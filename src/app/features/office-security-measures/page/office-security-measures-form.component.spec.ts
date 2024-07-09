import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSecurityMeasuresFormComponent } from './office-security-measures-form.component';

describe('OfficeSecurityMeasuresFormComponent', () => {
  let component: OfficeSecurityMeasuresFormComponent;
  let fixture: ComponentFixture<OfficeSecurityMeasuresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeSecurityMeasuresFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeSecurityMeasuresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
