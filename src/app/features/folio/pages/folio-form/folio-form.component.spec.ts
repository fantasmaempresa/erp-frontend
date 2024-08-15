import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioFormComponent } from './folio-form.component';

describe('FolioFormComponent', () => {
  let component: FolioFormComponent;
  let fixture: ComponentFixture<FolioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolioFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
