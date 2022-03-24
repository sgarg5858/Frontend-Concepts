import { TestBed } from '@angular/core/testing';
import exp = require('constants');
import { ContractService } from './contract.service';
import { MasterDataService } from './master-data.service';
import { mockedMasterData } from './master-data.service.spec';

import { NominationService } from './nomination.service';

describe('NominationService', () => {
  let service: NominationService;
  let contractService:any={};
  let masterDataService:MasterDataService;

  beforeEach(() => {

    let contractServiceMock = {
      getContracts: jest.fn().mockImplementation((customer: string, startDate: Date, endDate: Date)=>{
        if(customer == 'Customer-1') return ['Contract-1'];
        else if(customer == 'Customer-2') return ['Contract-2'];
        return [];
      })
    }
    let masterDataServiceMock={
      getAssetGroup: jest.fn().mockReturnValue(mockedMasterData.assetGroup),
      getTypes: jest.fn().mockImplementation((contract:string)=>{
        if(contract === 'Contract-1')
        {
          return ['Marine'];
        }
        else if(contract === 'Contract-2')
        {
          return ['Transport']
        }
        return [];
      }),
      getCustomer: jest.fn().mockImplementation((assetGroup:string)=>{

        if(assetGroup === 'AssetGroup-1')
        {
          return ['Customer-1'];
        }
        else if(assetGroup === 'AssetGroup-2')
        {
          return ['Customer-2'];
        }
        else if(assetGroup === 'assetGroup-3')
        {
          return ['Customer-3'];
        }
        else{
          return [];
        }

      }),
      getVesselLength: jest.fn().mockImplementation((vessel:string)=>{
        if(vessel === 'Vessel-1') return '100 ft';
        else if(vessel === 'Vessel-2') return '200 ft';
        return "";
      }),
      getVessels: jest.fn().mockReturnValue(mockedMasterData.vessels)

    }

    TestBed.configureTestingModule({
      providers:[
        {
          provide:MasterDataService,
          useValue:masterDataServiceMock
        },
        {
          provide:ContractService,
          useValue:contractServiceMock
        }
      ]
    });
    service = TestBed.inject(NominationService);
    masterDataService= TestBed.inject(MasterDataService);
    contractService = TestBed.inject(ContractService);
    // console.log(masterDataService,contractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getter for assetGroup returns assetGroups',(done)=>{
    service.assetGroup$.subscribe((val:string[])=>{
      console.log("Assetgroups",val);
      try {
        expect(val.length).toBe(3);
      expect(val).toEqual(mockedMasterData.assetGroup);
      done();
      } catch (error) {
        done(error);
      }
    })
  })


  it('getter for vessels returns vessels',(done)=>{
    service.vessels$.subscribe((val:string[])=>{
      console.log("Vessels",val);
     try {
      expect(val.length).toBe(2);
      done();
     } catch (error) {
       done(error);
     }
    })
  })


  it('getVesselLength returns correct vessel length',()=>{
    
    let length = service.getVesselLength('Vessel-1');
    expect(length).toBe('100 ft');
     length = service.getVesselLength('Vessel-3');
    expect(length).toBe("");
  })

  it('filter types method when passed Valid Contract',(done)=>{

    service.filterTypes('Contract-1');
    service.types$.subscribe((types:string[])=>{
      console.log("Valid Contract",types)
    
      try {
        expect(types.length).toBeGreaterThan(0);
        expect(types.length).toBe(1);
        done();
      } catch (error) {
        done(error);
      }

    })

  })

  it('filter types method when passed Invalid Contract',(done)=>{
    
    service.filterTypes('Contract-4');
    service.types$.subscribe((types:string[])=>{
      console.log("Invalid Contract",types)
     
      try {
        expect(types.length).toBe(0);
        done();
      } catch (error) {
        done(error);
      }

    })
  })

  it('Filter Contracts based on Customer- Valid Case ',(done)=>{
    
    service.filterContracts('Customer-1',new Date(),new Date());


    service.contracts.subscribe((contracts:string[])=>{
      console.log("Contracts",contracts)

      try {
        
        expect(contracts.length).toBe(1);
        expect(contracts[0]).toBe('Contract-1');
        done();

        //How to check this one? Is this right way
        // service.types$.subscribe((types:string[])=>{
        //   console.log("Valid Contract",types)
        //   try {
        //     expect(types.length).toBe(1);
        //     done();
        //   } catch (error) {
        //     done(error);
        //   }
        // })
      } catch (error) {
        done(error);
      }

    });

   

  })

  it('Filter Contracts based on Customer- InValid Case ',(done)=>{
    
    service.filterContracts('Customer-6',new Date(),new Date());

    //Checking Contracts
    service.contracts.subscribe((contracts:string[])=>{
      console.log("Contracts",contracts)
     try {
      expect(contracts.length).toBe(0);
      done();

     } catch (error) {
       done(error);
     }
    });
   

  })

  it('Filter Customers based on AssetGroups- Valid Case ',(done)=>{
    
    service.filterCustomers('AssetGroup-1');
    service.customers$.subscribe((customers:string[])=>{
      console.log("Customers",customers)
      try {
        expect(customers.length).toBe(1);
        done();
      } catch (error) {
        done(error);   
      }
    });
  })

});
