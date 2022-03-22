import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCreatePage1Component } from './meeting-create-page1.component';

describe('MeetingCreatePage1Component', () => {
  let component: MeetingCreatePage1Component;
  let fixture: ComponentFixture<MeetingCreatePage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingCreatePage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingCreatePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
