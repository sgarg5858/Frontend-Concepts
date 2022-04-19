import { TestBed } from '@angular/core/testing';

import { EngagingReporterService } from './engaging-reporter.service';

describe('EngagingReporterService', () => {
  let service: EngagingReporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagingReporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
