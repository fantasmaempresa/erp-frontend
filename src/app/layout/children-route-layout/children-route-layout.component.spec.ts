import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenRouteLayoutComponent } from './children-route-layout.component';

describe('ChildrenRouteLayoutComponent', () => {
  let component: ChildrenRouteLayoutComponent;
  let fixture: ComponentFixture<ChildrenRouteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildrenRouteLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenRouteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
