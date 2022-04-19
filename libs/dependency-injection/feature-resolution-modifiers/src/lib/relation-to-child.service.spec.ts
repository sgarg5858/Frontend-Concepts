import { TestBed } from '@angular/core/testing';

import { RelationToChildService } from './relation-to-child.service';

describe('RelationToChildService', () => {
  let service: RelationToChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationToChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
