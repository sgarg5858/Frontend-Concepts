import { TestBed } from '@angular/core/testing';

export const mockedContracts = [
  {
    contract: 'Contract-1',
    customer: 'Customer-1',
    startDate: '01-01-2021',
    endDate: '12-31-2021',
    index: 1,
  },
  {
    contract: 'Contract-2',
    customer: 'Customer-2',
    startDate: '01-01-2022',
    endDate: '12-31-2022',
    index: 2,
  },
];

import { ContractService } from './contract.service';

describe('ContractService', () => {
  let service: ContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getContracts method should return correct contracts based on correct Customer, StartDate and EndDate',()=>{
    
    service.contracts=mockedContracts;

    let contractTest1 = service.getContracts('Customer-1',new Date(),new Date());
    expect(contractTest1.length).toBe(1);
    expect(contractTest1[0]).toBe('Contract-1');
    

    let contractTest2 = service.getContracts('Customer-2',new Date(),new Date());

    expect(contractTest2.length).toBe(1);
    expect(contractTest2[0]).toBe('Contract-2');
  })

  it('getContracts method should return empty array when we give provide incorrect Customer, StartDate and EndDate ',()=>{
    
    service.contracts=mockedContracts;

    let contractTest1 = service.getContracts('Customer-12',new Date(),new Date());


    expect(contractTest1.length).toBe(0);

  })
});
