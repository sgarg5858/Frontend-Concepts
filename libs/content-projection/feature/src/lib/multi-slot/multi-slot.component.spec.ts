import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSlotComponent } from './multi-slot.component';

describe('MultiSlotComponent', () => {
  let component: MultiSlotComponent;
  let fixture: ComponentFixture<MultiSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
