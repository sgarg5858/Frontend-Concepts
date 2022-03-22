import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationHeaderComponent } from './nomination-header.component';

describe('NominationHeaderComponent', () => {
  let component: NominationHeaderComponent;
  let fixture: ComponentFixture<NominationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
