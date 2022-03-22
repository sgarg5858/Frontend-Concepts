import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationCreatePage3Component } from './nomination-create-page3.component';

describe('NominationCreatePage3Component', () => {
  let component: NominationCreatePage3Component;
  let fixture: ComponentFixture<NominationCreatePage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationCreatePage3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationCreatePage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
