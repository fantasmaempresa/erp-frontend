import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioControlComponent } from './folio-control.component';

describe('FolioControlComponent', () => {
  let component: FolioControlComponent;
  let fixture: ComponentFixture<FolioControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolioControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolioControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
