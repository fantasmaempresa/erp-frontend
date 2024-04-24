import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnerableOperationsFormComponent } from './vulnerable-operations-form.component';

describe('VulnerableOperationsFormComponent', () => {
  let component: VulnerableOperationsFormComponent;
  let fixture: ComponentFixture<VulnerableOperationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VulnerableOperationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VulnerableOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
