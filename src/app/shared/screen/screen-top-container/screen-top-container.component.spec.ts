import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTopContainerComponent } from './screen-top-container.component';

describe('ScreenTopContainerComponent', () => {
  let component: ScreenTopContainerComponent;
  let fixture: ComponentFixture<ScreenTopContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenTopContainerComponent]
    });
    fixture = TestBed.createComponent(ScreenTopContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
