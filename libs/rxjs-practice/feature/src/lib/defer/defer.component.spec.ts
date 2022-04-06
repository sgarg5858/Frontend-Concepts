import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferComponent } from './defer.component';

describe('DeferComponent', () => {
  let component: DeferComponent;
  let fixture: ComponentFixture<DeferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
