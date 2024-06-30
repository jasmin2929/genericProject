import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTableObjectComponent } from './ui-table-object.component';

describe('UiTableObjectComponent', () => {
  let component: UiTableObjectComponent;
  let fixture: ComponentFixture<UiTableObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiTableObjectComponent]
    });
    fixture = TestBed.createComponent(UiTableObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
