import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTopBodyComponent } from './screen-top-body.component';

describe('ScreenTopBodyComponent', () => {
  let component: ScreenTopBodyComponent;
  let fixture: ComponentFixture<ScreenTopBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenTopBodyComponent]
    });
    fixture = TestBed.createComponent(ScreenTopBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
