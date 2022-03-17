import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AligningGridItemsComponent } from './aligning-grid-items.component';

describe('AligningGridItemsComponent', () => {
  let component: AligningGridItemsComponent;
  let fixture: ComponentFixture<AligningGridItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AligningGridItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AligningGridItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
