import { TestBed } from '@angular/core/testing';

import { MeetingDataService } from './meeting-data.service';

describe('MeetingDataService', () => {
  let service: MeetingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
