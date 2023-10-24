import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResumenProjectComponent } from './dialog-resumen-project.component';

describe('DialogResumenProjectComponent', () => {
  let component: DialogResumenProjectComponent;
  let fixture: ComponentFixture<DialogResumenProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogResumenProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogResumenProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
