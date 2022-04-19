import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightWeightWidgetHeaderComponent } from './light-weight-widget-header.component';

describe('LightWeightWidgetHeaderComponent', () => {
  let component: LightWeightWidgetHeaderComponent;
  let fixture: ComponentFixture<LightWeightWidgetHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightWeightWidgetHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightWeightWidgetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
