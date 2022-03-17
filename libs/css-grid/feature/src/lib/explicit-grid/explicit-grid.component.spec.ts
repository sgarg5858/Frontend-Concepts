import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplicitGridComponent } from './explicit-grid.component';

describe('ExplicitGridComponent', () => {
  let component: ExplicitGridComponent;
  let fixture: ComponentFixture<ExplicitGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplicitGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplicitGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
