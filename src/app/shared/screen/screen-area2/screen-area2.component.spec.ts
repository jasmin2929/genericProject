import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenArea2Component } from './screen-area2.component';

describe('ScreenArea2Component', () => {
  let component: ScreenArea2Component;
  let fixture: ComponentFixture<ScreenArea2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenArea2Component]
    });
    fixture = TestBed.createComponent(ScreenArea2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
