import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildPredefinedFormatComponent } from './build-predefined-format.component';

describe('FirstPreventNoticeComponent', () => {
  let component: BuildPredefinedFormatComponent;
  let fixture: ComponentFixture<BuildPredefinedFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildPredefinedFormatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildPredefinedFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
