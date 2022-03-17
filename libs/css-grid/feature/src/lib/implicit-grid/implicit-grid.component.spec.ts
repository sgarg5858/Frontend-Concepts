import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplicitGridComponent } from './implicit-grid.component';

describe('ImplicitGridComponent', () => {
  let component: ImplicitGridComponent;
  let fixture: ComponentFixture<ImplicitGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplicitGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplicitGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
