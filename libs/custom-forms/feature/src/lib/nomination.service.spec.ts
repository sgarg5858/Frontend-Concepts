import { TestBed } from '@angular/core/testing';

import { NominationService } from './nomination.service';

describe('NominationService', () => {
  let service: NominationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
