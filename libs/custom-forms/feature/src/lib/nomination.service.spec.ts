import { TestBed } from '@angular/core/testing';
import exp = require('constants');
import { firstValueFrom, lastValueFrom, Observable, skip } from 'rxjs';
import { ContractService } from './contract.service';
import { MasterDataService } from './master-data.service';
import { mockedMasterData } from './master-data.service.spec';

import { NominationService } from './nomination.service';

describe('NominationService', () => {
  let service: NominationService;
  let contractService:ContractService;
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


  it('filter types method should push the correct [Marine] types via behavior subject when we pass correct contract Contract-1 ',(done)=>{

    //Then call the method
    service.filterTypes('Contract-1');

    //First Subscribe
    service.types$.subscribe((types:string[])=>{
      console.log("Valid Contract",types)
      try {
        expect(types.length).toBe(1);
        expect(types[0]).toBe('Marine')
        done();
      } catch (error) {
        done(error);
      }
    })
  })

  it('filter types method should push the empty [] types via behavior subject when we pass Wrong contract Contract-5 ',(done)=>{
    
    service.filterTypes('Contract-5');
    
    service.types$.subscribe((types:string[])=>{
     
      try {
        expect(types.length).toBe(0);
        done();
      } catch (error) {
        done(error);
      }

    })
  })

  it('Filter Contracts method should push [Contract-1]  via contractSubject behavior subject when we pass Correct Customer Customer-1, StartDate and End Date ',(done)=>{
    

    // We can add pipe(skip(1)) to bypass intial value of behavior subject.
    service.contracts.pipe(skip(1)).subscribe((contracts:string[])=>{
      console.log("Contracts",contracts)
        try {
          expect(contracts.length).toBe(1);
          expect(contracts[0]).toBe('Contract-1');
        } catch (error) {
          done(error);
        }
    });

    //This will be called later therefore we can done here 
    service.types$.pipe(skip(1)).subscribe((types:string[])=>{
      console.log("Valid Contract",types)
      try {
        expect(types.length).toBe(0);
        expect.assertions(3);
        done();
      } catch (error) {
        done(error);
      }
    })
    service.filterContracts('Customer-1',new Date(),new Date());

  })

 

  it('Filter Contracts method should push []  via contractSubject behavior subject when we pass Wrong Customer Customer-10, StartDate and End Date ',(done)=>{
    
    service.filterContracts('Customer-10',new Date(),new Date());

    // We can add pipe(skip(1)) to bypass intial value of behavior subject.
    service.contracts.subscribe((contracts:string[])=>{
      console.log("Contracts",contracts)
        try {
          expect(contracts.length).toBe(0);
          expect(contracts).toEqual([]);
        } catch (error) {
         done(error); 
        }
    });

    //This will be called later therefore we can done here 
    service.types$.subscribe((types:string[])=>{
      console.log("Valid Contract",types)
      try {
        expect(types.length).toBe(0);
        expect.assertions(3);
        done();
      } catch (error) {
        done(error);
      }
    })

  })


 

  it('Filter Customers method should push [Customer-1] via customerSubject when we pass Correct AssetGroup-1 to it. ',(done)=>{
    
    service.filterCustomers('AssetGroup-1');

    service.customers$.subscribe((customers:string[])=>{
      console.log("Customers",customers)
      try {
        expect(customers.length).toBe(1);
        expect(customers).toEqual(['Customer-1'])
      } catch (error) {
        done(error);   
      }
    });

     service.contracts.subscribe((contracts:string[])=>{
      console.log("Contracts",contracts)
        try {
          expect(contracts.length).toBe(0);
          expect(contracts).toEqual([]);
        } catch (error) {
          done(error);
        }
    });

    //This will be called later therefore we can done here 
    service.types$.subscribe((types:string[])=>{
      console.log("Valid Contract",types)
      try {
        expect(types.length).toBe(0);
        //Here we can done() & check the number of assertions ran in this test.
        expect.assertions(5);
        done();
      } catch (error) {
        done(error);
      }
    })

  })

  

  it('Filter Customers method should push [] via customerSubject when we pass Invalid AssetGroup-10 to it. ',(done)=>{
    
    service.filterCustomers('AssetGroup-10');

    service.customers$.subscribe((customers:string[])=>{
      console.log("Customers",customers)
      try {
        expect(customers.length).toBe(0);
        expect(customers).toEqual([])
      } catch (error) {
        done(error);   
      }
    });

     service.contracts.subscribe((contracts:string[])=>{
      console.log("Contracts",contracts)
        try {
          expect(contracts.length).toBe(0);
          expect(contracts).toEqual([]);
        } catch (error) {
          done(error);
        }
    });

    //This will be called later therefore we can done here 
    service.types$.subscribe((types:string[])=>{
      console.log("Valid Contract",types)
      try {

        expect(types.length).toBe(0);

        //this makes the end of test.
        // As we verify 5 assertions are run
        //We know types$ will emit data in last
        //and we can call done here only
        expect.assertions(5);
        done();


      } catch (error) {
        done(error);
      }
    })

  })

  //Use this approach to test observables ....

//   it('Filter Customers based on AssetGroups- Valid Case Promise way ',async()=>{
    
//     service.filterCustomers('AssetGroup-1');

//     await expect(firstValueFrom(service.customers$)).resolves.toEqual(['Customer-1']);

//     await firstValueFrom(service.customers$).then((customers:string[])=>{
//       expect(customers).toEqual(['Customer-1']);
//       expect(customers.length).toBe(1);
//     })

//     await expect(firstValueFrom(service.contracts)).resolves.toEqual([]);
//     await expect(firstValueFrom(service.types$)).resolves.toEqual([]);

//   })

});

 // it('Filter Contracts based on Customer- Valid Case Promise Way ',async ()=>{
    
  //   service.filterContracts('Customer-1',new Date(),new Date());

  //   await expect(firstValueFrom(service.contracts)).resolves.toEqual(['Contract-1']);

  //   await expect(firstValueFrom(service.types$)).resolves.toEqual([]);

  // });
   
  // it('Filter Contracts based on Customer- InValid Case  -Promise Way',async ()=>{
    
  //   service.filterContracts('Customer-6',new Date(),new Date());

  //   await expect(firstValueFrom(service.contracts)).resolves.toEqual([]);
  //   });