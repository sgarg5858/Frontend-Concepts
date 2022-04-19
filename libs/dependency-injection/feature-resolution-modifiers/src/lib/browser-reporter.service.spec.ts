import { TestBed } from '@angular/core/testing';

import { BrowserReporterService } from './browser-reporter.service';

describe('BrowserReporterService', () => {
  let service: BrowserReporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserReporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
