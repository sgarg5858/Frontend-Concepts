import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCreatePage2Component } from './meeting-create-page2.component';

describe('MeetingCreatePage2Component', () => {
  let component: MeetingCreatePage2Component;
  let fixture: ComponentFixture<MeetingCreatePage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingCreatePage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingCreatePage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
