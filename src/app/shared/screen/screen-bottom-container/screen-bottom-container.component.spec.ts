import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenBottomContainerComponent } from './screen-bottom-container.component';

describe('ScreenBottomContainerComponent', () => {
  let component: ScreenBottomContainerComponent;
  let fixture: ComponentFixture<ScreenBottomContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenBottomContainerComponent]
    });
    fixture = TestBed.createComponent(ScreenBottomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
