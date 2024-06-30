import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTopHeaderComponent } from './screen-top-header.component';

describe('ScreenTopHeaderComponent', () => {
  let component: ScreenTopHeaderComponent;
  let fixture: ComponentFixture<ScreenTopHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenTopHeaderComponent]
    });
    fixture = TestBed.createComponent(ScreenTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
