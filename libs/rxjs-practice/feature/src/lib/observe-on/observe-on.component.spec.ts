import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserveOnComponent } from './observe-on.component';

describe('ObserveOnComponent', () => {
  let component: ObserveOnComponent;
  let fixture: ComponentFixture<ObserveOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObserveOnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserveOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
