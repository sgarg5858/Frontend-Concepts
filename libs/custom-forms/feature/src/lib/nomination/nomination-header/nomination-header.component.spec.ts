import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';

import {Dropdown, DropdownModule} from 'primeng/dropdown';
import {Calendar, CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';

import { NominationHeaderComponent } from './nomination-header.component';
import { NominationService } from '../../nomination.service';
import { mockedMasterData } from '../../master-data.service.spec';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
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

export class NominationServiceMock{

    customerSubject = new BehaviorSubject<string[]>([]);
    customers$=this.customerSubject.asObservable();

    private contractSubject= new BehaviorSubject<string[]> ([]);
    contracts = this.contractSubject.asObservable();

    private typeSubject  = new BehaviorSubject<string[]>([]);
    types$ = this.typeSubject.asObservable();

    assetGroup$= of(mockedMasterData.assetGroup);

    vessels$= of( [
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
    fixture.detectChanges();
    nominationServiceMock=TestBed.inject(NominationService);
    debugElement=fixture.debugElement;
    //For Testing Rxjs Observables
    scheduler = new TestScheduler((actual,expected)=>{
      expect(actual).toEqual(expected);
    })

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find the assetGroup field in DOM',()=>{
    const assetGroup = debugElement.query(By.css('.item-0 .p-element'));
    expect(assetGroup).toBeDefined();
    assetGroup.nativeElement.click();
  })

  it('Setting Value of the assetgroup via setValue', async()=>{
    console.log("Setting Asset Group Value");
    component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-1');
    fixture.detectChanges();
    

    fixture.componentInstance.formGroup?.['controls']?.['assetGroup'].valueChanges.subscribe((value)=>{
      console.log("AssetGroups Coming vai setValue",value)
    })
 
    expect(nominationServiceMock.filterCustomers).toBeCalled();
    expect(nominationServiceMock.filterContracts).toBeCalled();
    expect(nominationServiceMock.filterTypes).toBeCalled();

    await expect(firstValueFrom(nominationServiceMock.customers$)).resolves.toEqual(['Customer-1']);
    await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual([]);
    await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);

  });


  it('Setting Value of the assetgroup via setValue and using TestScheduler', async()=>{

    scheduler.run(({expectObservable})=>{


      const expectedCustomers={a:['Customer-1']};
      const customerSource$ = 'a';
      const contractsAndTypes$="a";
      const contractAndTypeValues={a:[]};

      component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-1');
      fixture.detectChanges();

      expect(nominationServiceMock.filterCustomers).toBeCalled();
      expect(nominationServiceMock.filterContracts).toBeCalled();
      expect(nominationServiceMock.filterTypes).toBeCalled();

     

      expectObservable(nominationServiceMock.customers$).toBe(customerSource$,expectedCustomers);
      expectObservable(nominationServiceMock.contracts).toBe(contractsAndTypes$,contractAndTypeValues);
      expectObservable(nominationServiceMock.types$).toBe(contractsAndTypes$,contractAndTypeValues);

    })
  });

  it('Setting Value of the assetgroup via UI and using DropDown Class', async()=>{
    console.log("Setting Asset Group Value");

    const assetGroup:Dropdown = debugElement.query(By.css('.item-0 .p-element')).componentInstance;
    const customer:Dropdown = debugElement.query(By.css('.item-1 .p-element')).componentInstance;

    //Working for assetgroup
    console.log("AssetGroup Options",assetGroup.options)
    expect(assetGroup.options.length).toBe(3);
    //Intially customer options should be zero
    expect(customer.options.length).toBe(0);

    fixture.componentInstance.formGroup?.['controls']?.['assetGroup'].valueChanges.subscribe((value)=>{
      console.log("AssetGroups Coming from DropDown",value)
    })


    assetGroup.selectItem(new Event('change'),'AssetGroup-1');
    fixture.detectChanges();

    // customer.options=["Customer-1"]

    //After selecting AssetGroup it should be available
    expect(customer.options.length).toBe(1);
   
    expect(nominationServiceMock.filterCustomers).toBeCalled();
    expect(nominationServiceMock.filterContracts).toBeCalled();
    expect(nominationServiceMock.filterTypes).toBeCalled();

    await expect(firstValueFrom(nominationServiceMock.customers$)).resolves.toEqual(['Customer-1']);
    await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual([]);
    await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);

  });

  it('Setting Value of the Customer,Start Date and End Date via UI and using DropDown Class', async()=>{
    console.log("Setting Asset Group Value");

    // const assetGroup:Dropdown = debugElement.query(By.css('.item-0 .p-element')).componentInstance;

    const customer:Dropdown = debugElement.query(By.css('.item-1 .p-element')).componentInstance;
    const startDate:Calendar = debugElement.query(By.css('.item-2 .p-element')).componentInstance;
    const endDate:Calendar = debugElement.query(By.css('.item-3 .p-element')).componentInstance;
    const contract:Dropdown = debugElement.query(By.css('.item-4 .p-element')).componentInstance;


    // assetGroup.selectItem(new Event('change'),'AssetGroup-1');
    // fixture.detectChanges();

  
    //When the value for only customer is set  it should not call filter contracts
    customer.selectItem(new Event('change'),'Customer-1');
    fixture.detectChanges();

    expect(nominationServiceMock.filterContracts).not.toBeCalled();
    expect(nominationServiceMock.filterTypes).not.toBeCalled();

    fixture.componentInstance.formGroup?.['controls']?.['startDate'].valueChanges.subscribe((value)=>{
      console.log("StartDate Coming from Calendar",value)
    })

    //When start Date is set but endDate is not set yet it should not call filterContracts
    //this is giving invalid date 
    // we can set start and end Date via model...
    startDate.selectDate(new Date());
    fixture.detectChanges();

    expect(nominationServiceMock.filterContracts).not.toBeCalled();
    expect(nominationServiceMock.filterTypes).not.toBeCalled();

   //Before selecting customer , start date , end date contact options should not be available
    expect(contract.options.length).toBe(0);

    //When end Date is set and we have all three values now it shpuld call filter contracts
    endDate.selectDate(new Date());

    fixture.detectChanges();

    expect(nominationServiceMock.filterContracts).toBeCalled();
    expect(nominationServiceMock.filterTypes).toBeCalled();

    await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual(['Contract-1']);
    await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);


    //Then we select Contract and in turn it should type...
    expect(contract.options).toEqual(['Contract-1']);
    contract.selectItem(new Event('change'),'Contract-1');
    fixture.detectChanges();

    expect(nominationServiceMock.filterTypes).toBeCalled();
    await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual(['Marine']);

  });



});
