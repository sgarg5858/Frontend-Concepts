import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationCreatePage2Component } from './nomination-create-page2.component';

describe('NominationCreatePage2Component', () => {
  let component: NominationCreatePage2Component;
  let fixture: ComponentFixture<NominationCreatePage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationCreatePage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationCreatePage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
