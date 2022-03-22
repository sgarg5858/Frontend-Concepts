import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineDetailsComponent } from './marine-details.component';

describe('MarineDetailsComponent', () => {
  let component: MarineDetailsComponent;
  let fixture: ComponentFixture<MarineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
