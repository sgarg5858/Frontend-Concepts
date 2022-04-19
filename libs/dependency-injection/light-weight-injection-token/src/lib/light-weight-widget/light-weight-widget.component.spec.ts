import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightWeightWidgetComponent } from './light-weight-widget.component';

describe('LightWeightWidgetComponent', () => {
  let component: LightWeightWidgetComponent;
  let fixture: ComponentFixture<LightWeightWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightWeightWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightWeightWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
