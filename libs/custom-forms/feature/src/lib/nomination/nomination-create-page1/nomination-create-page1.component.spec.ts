import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationCreatePage1Component } from './nomination-create-page1.component';

describe('NominationCreatePage1Component', () => {
  let component: NominationCreatePage1Component;
  let fixture: ComponentFixture<NominationCreatePage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationCreatePage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationCreatePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
