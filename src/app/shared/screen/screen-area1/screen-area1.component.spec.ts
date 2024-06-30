import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenArea1Component } from './screen-area1.component';

describe('ScreenArea1Component', () => {
  let component: ScreenArea1Component;
  let fixture: ComponentFixture<ScreenArea1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenArea1Component]
    });
    fixture = TestBed.createComponent(ScreenArea1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
