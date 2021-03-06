import { DatePipe } from '@angular/common';
import { ComponentFixture, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';

import {Dropdown, DropdownModule} from 'primeng/dropdown';
import {Calendar, CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';

import { NominationHeaderComponent } from './nomination-header.component';
import { NominationService } from '../../nomination.service';
import { mockedMasterData } from '../../master-data.service.spec';
import { asyncScheduler, BehaviorSubject, defer, firstValueFrom, Observable, of, take } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestScheduler } from 'rxjs/testing';

let nominationServiceMockValue={
  customers$:of(['']),
  contracts:of(['']),
  types$ :of(['']),
  vessels$:of(['']),
  assetGroup$: of(mockedMasterData.assetGroup),
  getVesselLength: jest.fn().mockImplementation((vessel:string)=>{
    if(vessel === 'Vessel-1') return '100 ft';
    else if( vessel === 'Vessel-2') return '200 ft';
    return "";
  }),
  filterCustomers: jest.fn().mockImplementation((assetGroup:string)=>{
    console.log("Calling filter Customers on Asset Group Change",assetGroup);
    
    if(assetGroup == 'AssetGroup-1') 
    nominationServiceMockValue.customers$= of(['Customer-1']);
    else if(assetGroup == 'AssetGroup-2') 
    nominationServiceMockValue.customers$= of(['Customer-2'])
    else if(assetGroup == 'AssetGroup-3') 
    nominationServiceMockValue.customers$= of(['Customer-3'])
    else 
    nominationServiceMockValue.customers$= of([])


    nominationServiceMockValue.filterContracts("",new Date(), new Date());
  }),
  filterContracts: jest.fn().mockImplementation((customer:string, startDate:Date, endDate:Date)=>{
    if(customer === 'Customer-1') 
    nominationServiceMockValue.contracts = of(['Contract-1']);
    else if(customer === 'Customer-2') 
    nominationServiceMockValue.contracts = of(['Contract-2']);
    else 
    nominationServiceMockValue.contracts = of([]);

    nominationServiceMockValue.filterTypes("");

  }),
  filterTypes: jest.fn().mockImplementation((contract:string)=>{

    if(contract == 'Contract-1') nominationServiceMockValue.types$ = of(['Marine']);
    else if (contract == 'Contract-2') nominationServiceMockValue.types$ = of(['Transport']);
    else nominationServiceMockValue.types$ = of([])
  })
}
export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

export class NominationServiceMock{

    customerSubject = new BehaviorSubject<string[]>([]);
    customers$=this.customerSubject.asObservable();

    private contractSubject= new BehaviorSubject<string[]> ([]);
    contracts = this.contractSubject.asObservable();

    private typeSubject  = new BehaviorSubject<string[]>([]);
    types$ = this.typeSubject.asObservable();

    assetGroup$= of(mockedMasterData.assetGroup);

    vessels$= asyncData([
      'Vessel-1','Vessel-2'
    ]);

    getVesselLength= jest.fn().mockImplementation((vessel:string)=>{
      if(vessel === 'Vessel-1') return '100 ft';
      else if( vessel === 'Vessel-2') return '200 ft';
      return "";
    });

    filterCustomers= jest.fn().mockImplementation((assetGroup:string)=>{
      console.log("Calling filter Customers on Asset Group Change",assetGroup);
      
      if(assetGroup == 'AssetGroup-1') 
        this.customerSubject.next(['Customer-1'])
      else if(assetGroup == 'AssetGroup-2') 
        this.customerSubject.next(['Customer-2'])
      else if(assetGroup == 'AssetGroup-3') 
        this.customerSubject.next(['Customer-3'])
      else 
        this.customerSubject.next([]);
      this.filterContracts("",new Date(), new Date());
    });

    filterContracts= jest.fn().mockImplementation((customer:string, startDate:Date, endDate:Date)=>{
      if(customer === 'Customer-1') 
        this.contractSubject.next(['Contract-1'])
      else if(customer === 'Customer-2') 
        this.contractSubject.next(['Contract-2'])
      else 
        this.contractSubject.next([])

      this.filterTypes("");
    })

    filterTypes= jest.fn().mockImplementation((contract:string)=>{

      if(contract == 'Contract-1') this.typeSubject.next(['Marine']);
      else if (contract == 'Contract-2') this.typeSubject.next(['Transport']);
      else this.typeSubject.next([]);

    })
}

describe('NominationHeaderComponent', () => {
  let component: NominationHeaderComponent;
  let fixture: ComponentFixture<NominationHeaderComponent>;
  let nominationServiceMock: NominationService;
  let debugElement:DebugElement;
  let scheduler:TestScheduler;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      declarations: [ NominationHeaderComponent ],
      providers:[
        DatePipe,
        {
          provide:NominationService,
          // useValue:nominationServiceMockValue
          useClass: NominationServiceMock
        }
      ],
      imports:[
        ReactiveFormsModule,
        DropdownModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        CalendarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationHeaderComponent);
    component = fixture.componentInstance;
    debugElement=fixture.debugElement;
    fixture.detectChanges();
    nominationServiceMock=TestBed.inject(NominationService);
    //For Testing Rxjs Observables
    scheduler = new TestScheduler((actual,expected)=>{
      expect(actual).toEqual(expected);
    })

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create the formGroup instance correctly and should have all our controls',()=>{

    const formGroup = fixture.componentInstance.formGroup;
    //Checking our formGroup
    expect(formGroup).toBeDefined();
    expect(Object.keys(formGroup.controls).length).toBe(7);
    expect(formGroup?.['controls']?.['assetGroup']).toBeDefined();
    expect(formGroup?.['controls']?.['customer']).toBeDefined();
    expect(formGroup?.['controls']?.['startDate']).toBeDefined();
    expect(formGroup?.['controls']?.['endDate']).toBeDefined();
    expect(formGroup?.['controls']?.['contract']).toBeDefined();
    expect(formGroup?.['controls']?.['type']).toBeDefined();
    expect(formGroup?.['controls']?.['vessel']).toBeDefined();

  })

  it('valueChanged EventEmitter should emit event whenever the value of any control is updated.',(done)=>{
    component.valueChanged.pipe(take(1)).
    subscribe((event:{control:string,value:any})=>{
      try {
        expect(event.control).toBe('type');
        expect(event.value).toBe('Marine');
        done();
      } catch (error) {
        done(error);
      }
    })
    component.formGroup.controls?.['type'].setValue('Marine');
    fixture.detectChanges();

  })

  it('On getting input vessel it should update the value in the form',()=>{
    
    expect(component.formGroup.controls?.['vessel'].value).toBe(null)
    component.vessel="Vessel-1";
    fixture.detectChanges();
   expect(component.formGroup.controls?.['vessel'].value).toBe('Vessel-1')

  })

  it('When setting the value of the assetgroup via setValue it should update customer options and reset the customer value to null ',(done)=>{

    component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-1');
    fixture.detectChanges();
    
    expect(component.formGroup?.['controls']?.['assetGroup'].value).toBe('AssetGroup-1');

    //checking the value of customer controls
    expect(component.formGroup?.['controls']?.['customer'].value).toBe(null);

    //Checking the options for customer controls
    nominationServiceMock.customers$.subscribe((customers:string[])=>{
      try {
        expect(customers.length).toBe(1);
        expect(customers[0]).toBe('Customer-1')
        done();
      } catch (error) {
        done(error);
      }
    })
  });

  it('When setting the value of the customer,startDate,EndDate via setValue it should update Contract options and reset the Contract value to null ',(done)=>{

    component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-1');
    component.formGroup.controls?.['customer'].setValue('Customer-1');
    component.formGroup.controls?.['startDate'].setValue(new Date());
    component.formGroup.controls?.['endDate'].setValue(new Date());
    fixture.detectChanges();

    //this tests our combineLatest
    expect(nominationServiceMock.filterContracts).toBeCalled();

    //checking the value of contrac5 controls
    expect(component.formGroup?.['controls']?.['contract'].value).toBe(null);

    //Checking the options for customer controls
    nominationServiceMock.contracts.subscribe((contracts:string[])=>{
      try {
        expect(contracts.length).toBe(1);
        expect(contracts).toEqual(['Contract-1'])
        done();
      } catch (error) {
        done(error);
      }
    });

  });


  it('When setting the value of the customer only (startDate and EndDate are not there)  via setValue it should not update Contract options but reset the Contract value to null ',()=>{

    component.formGroup.controls?.['customer'].setValue('Customer-1');
    fixture.detectChanges();

    //checking the value of contract control
    expect(component.formGroup?.['controls']?.['contract'].value).toBe(null);

    //Checking filter contracts have been called or not
   expect(nominationServiceMock.filterContracts).not.toBeCalled();
    })

  it('we selected assetGroup AssetGroup-1 and then we selected Customer-1, but now we want to select AssetGroup-2 and Customer depends on AssetGroup,so it should reset the customer value and upate its options too based on AssetGroup-2',(done)=>{

    component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-1');
    fixture.detectChanges();
    //take(1) as we want to run this one for just one time.
    nominationServiceMock.customers$.pipe(take(1)).
    subscribe((customers:string[])=>{
      try {
        expect(customers.length).toBe(1);
        expect(customers).toEqual(['Customer-1'])
      } catch (error) {
        done(error);
      }
    })

    component.formGroup.controls?.['customer'].setValue('Customer-1');

    fixture.detectChanges();

    expect(component.formGroup?.['controls']?.['customer'].value).toBe('Customer-1');


    //Now we are changing the asset group
    component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-2');
    fixture.detectChanges();

    // It should reset customer value
    expect(component.formGroup?.['controls']?.['customer'].value).toBe(null);

    nominationServiceMock.customers$.pipe(take(1))
    .subscribe((customers:string[])=>{
      try {
        expect(customers.length).toBe(1);
        expect(customers).toEqual(['Customer-2'])
        expect.assertions(6);
        done();
      } catch (error) {
        done(error);
      }
    })

   
  })
  
 

  // it('Setting Value of the assetgroup via UI and using DropDown Class', async()=>{
  //   console.log("Setting Asset Group Value");

  //   const assetGroup:Dropdown = debugElement.query(By.css('.item-0 .p-element')).componentInstance;
  //   const customer:Dropdown = debugElement.query(By.css('.item-1 .p-element')).componentInstance;
  // //  let nomination= debugElement.injector.get(NominationService)
  //   //Working for assetgroup
  //   console.log("AssetGroup Options",assetGroup.options)
  //   expect(assetGroup.options.length).toBe(3);
  //   //Intially customer options should be zero
  //   expect(customer.options.length).toBe(0);

  //   fixture.componentInstance.formGroup?.['controls']?.['assetGroup'].valueChanges.subscribe((value)=>{
  //     console.log("AssetGroups Coming from DropDown",value)
  //   })
  //   // flushMicrotasks();


  //   assetGroup.selectItem(new Event('change'),'AssetGroup-1');
  //   fixture.detectChanges();

  //   // customer.options=["Customer-1"]

  //   //After selecting AssetGroup it should be available
  //   expect(customer.options.length).toBe(1);
   
  //   expect(nominationServiceMock.filterCustomers).toBeCalled();
  //   expect(nominationServiceMock.filterContracts).toBeCalled();
  //   expect(nominationServiceMock.filterTypes).toBeCalled();

  //   await expect(firstValueFrom(nominationServiceMock.customers$)).resolves.toEqual(['Customer-1']);
  //   await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual([]);
  //   await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);

  // });

  // it('Setting Value of the Customer,Start Date and End Date via UI and using DropDown Class', async()=>{
  //   console.log("Setting Asset Group Value");

  //   // const assetGroup:Dropdown = debugElement.query(By.css('.item-0 .p-element')).componentInstance;

  //   const customer:Dropdown = debugElement.query(By.css('.item-1 .p-element')).componentInstance;
  //   const startDate:Calendar = debugElement.query(By.css('.item-2 .p-element')).componentInstance;
  //   const endDate:Calendar = debugElement.query(By.css('.item-3 .p-element')).componentInstance;
  //   const contract:Dropdown = debugElement.query(By.css('.item-4 .p-element')).componentInstance;


  //   // assetGroup.selectItem(new Event('change'),'AssetGroup-1');
  //   // fixture.detectChanges();
  
  //   //When the value for only customer is set  it should not call filter contracts
  //   customer.selectItem(new Event('change'),'Customer-1');
  //   fixture.detectChanges();

  //   expect(nominationServiceMock.filterContracts).not.toBeCalled();
  //   expect(nominationServiceMock.filterTypes).not.toBeCalled();

  //   fixture.componentInstance.formGroup?.['controls']?.['startDate'].valueChanges.subscribe((value)=>{
  //     console.log("StartDate Coming from Calendar",value)
  //   })

  //   //When start Date is set but endDate is not set yet it should not call filterContracts
  //   //this is giving invalid date 
  //   // we can set start and end Date via model...
  //   startDate.selectDate(new Date());
  //   fixture.detectChanges();

  //   expect(nominationServiceMock.filterContracts).not.toBeCalled();
  //   expect(nominationServiceMock.filterTypes).not.toBeCalled();

  //  //Before selecting customer , start date , end date contact options should not be available
  //   expect(contract.options.length).toBe(0);

  //   //When end Date is set and we have all three values now it shpuld call filter contracts
  //   endDate.selectDate(new Date());

  //   fixture.detectChanges();

  //   expect(nominationServiceMock.filterContracts).toBeCalled();
  //   expect(nominationServiceMock.filterTypes).toBeCalled();

  //   await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual(['Contract-1']);
  //   await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);


  //   //Then we select Contract and in turn it should type...
  //   expect(contract.options).toEqual(['Contract-1']);
  //   contract.selectItem(new Event('change'),'Contract-1');
  //   fixture.detectChanges();

  //   expect(nominationServiceMock.filterTypes).toBeCalled();
  //   await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual(['Marine']);

  // });

  //Using Test Scheduler
  // it('Setting Value of the assetgroup via setValue and using TestScheduler', async()=>{

  //   scheduler.run(({expectObservable})=>{


  //     const expectedCustomers={a:['Customer-1']};
  //     const customerSource$ = 'a';
  //     const contractsAndTypes$="a";
  //     const contractAndTypeValues={a:[]};

  //     component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-1');
  //     fixture.detectChanges();

  //     expect(nominationServiceMock.filterCustomers).toBeCalled();
  //     expect(nominationServiceMock.filterContracts).toBeCalled();
  //     expect(nominationServiceMock.filterTypes).toBeCalled();

     

  //     expectObservable(nominationServiceMock.customers$).toBe(customerSource$,expectedCustomers);
  //     expectObservable(nominationServiceMock.contracts).toBe(contractsAndTypes$,contractAndTypeValues);
  //     expectObservable(nominationServiceMock.types$).toBe(contractsAndTypes$,contractAndTypeValues);

  //   })
  // });
});
