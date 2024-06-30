import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenArea3Component } from './screen-area3.component';

describe('ScreenArea3Component', () => {
  let component: ScreenArea3Component;
  let fixture: ComponentFixture<ScreenArea3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenArea3Component]
    });
    fixture = TestBed.createComponent(ScreenArea3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
