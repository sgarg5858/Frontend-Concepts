import { TestBed } from '@angular/core/testing';

import { ContractDataService } from './contract-data.service';

describe('ContractDataService', () => {
  let service: ContractDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
