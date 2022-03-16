import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSlotComponent } from './single-slot.component';

describe('SingleSlotComponent', () => {
  let component: SingleSlotComponent;
  let fixture: ComponentFixture<SingleSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
