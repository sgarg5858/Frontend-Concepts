import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandParentComponent } from './grand-parent.component';

describe('GrandParentComponent', () => {
  let component: GrandParentComponent;
  let fixture: ComponentFixture<GrandParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrandParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
