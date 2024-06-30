import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericComponentPageComponent } from './generic-component-page.component';

describe('GenericComponentPageComponent', () => {
  let component: GenericComponentPageComponent;
  let fixture: ComponentFixture<GenericComponentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericComponentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericComponentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
