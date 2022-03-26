import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';

import {Dropdown, DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';

import { NominationHeaderComponent } from './nomination-header.component';
import { NominationService } from '../../nomination.service';
import { mockedMasterData } from '../../master-data.service.spec';
import { firstValueFrom, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createPublicKey } from 'crypto';

describe('NominationHeaderComponent', () => {
  let component: NominationHeaderComponent;
  let fixture: ComponentFixture<NominationHeaderComponent>;
  let nominationServiceMock: NominationService;
  let debugElemenet:DebugElement;

  beforeEach(async () => {

    let nominationServiceMockvalue={
      customers$:of([]),
      contracts:of([]),
      types$ :of([]),
      vessels$:of([]),
      assetGroup$: of(mockedMasterData.assetGroup),
      getVesselLength: jest.fn().mockImplementation((vessel:string)=>{
        if(vessel === 'Vessel-1') return '100 ft';
        else if( vessel === 'Vessel-2') return '200 ft';
        return "";
      }),
      filterCustomers: jest.fn().mockImplementation((assetGroup:string)=>{
        console.log("Calling filter Customers on Asset Group Change",assetGroup)
        if(assetGroup == 'AssetGroup-1') 
        nominationServiceMock.customers$= of(['Customer-1']);
        else if(assetGroup == 'AssetGroup-2') 
        nominationServiceMock.customers$= of(['Customer-2'])
        else if(assetGroup == 'AssetGroup-3') 
        nominationServiceMock.customers$= of(['Customer-3'])
        else 
        nominationServiceMock.customers$= of([])

        nominationServiceMockvalue.filterContracts("",new Date(), new Date());
      }),
      filterContracts: jest.fn().mockImplementation((customer:string, startDate:Date, endDate:Date)=>{
        if(customer === 'Customer-1') 
        nominationServiceMock.contracts = of(['Contract-1']);
        else if(customer === 'Customer-2') 
        nominationServiceMock.contracts = of(['Contract-2']);
        else 
        nominationServiceMock.contracts = of([]);

        nominationServiceMock.filterTypes("");

      }),
      filterTypes: jest.fn().mockImplementation((contract:string)=>{

        if(contract == 'Contract-1') nominationServiceMock.types$ = of(['Marine']);
        else if (contract == 'Contract-2') nominationServiceMock.types$ = of(['Transport']);
        else nominationServiceMock.types$ = of([])
      })
    }


    await TestBed.configureTestingModule({
      declarations: [ NominationHeaderComponent ],
      providers:[
        DatePipe,
        {
          provide:NominationService,
          useValue:nominationServiceMockvalue
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
    debugElemenet=fixture.debugElement;

  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should find the assetGroup field in DOM',()=>{
  //   const assetGroup = debugElemenet.query(By.css('.item-0 .p-element'));
  //   expect(assetGroup).toBeDefined();
  //   assetGroup.nativeElement.click();

  // })

  // it('Setting Value of the assetgroup via setValue', async()=>{
  //   console.log("Setting Asset Group Value");
  //   component.formGroup.controls?.['assetGroup'].setValue('AssetGroup-1');


  //   fixture.detectChanges();

  //   fixture.componentInstance.formGroup?.['controls']?.['assetGroup'].valueChanges.subscribe((value)=>{
  //     console.log("AssetGroups Coming vai setValue",value)
  //   })
 
  //   expect(nominationServiceMock.filterCustomers).toBeCalled();
  //   expect(nominationServiceMock.filterContracts).toBeCalled();
  //   expect(nominationServiceMock.filterTypes).toBeCalled();

  //   await expect(firstValueFrom(nominationServiceMock.customers$)).resolves.toEqual(['Customer-1']);
  //   await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual([]);
  //   await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);

  // });

  it('Setting Value of the assetgroup via UI and using DropDown Class', async()=>{
    console.log("Setting Asset Group Value");

    const assetGroup:Dropdown = debugElemenet.query(By.css('.item-0 .p-element')).componentInstance;

    fixture.componentInstance.formGroup?.['controls']?.['assetGroup'].valueChanges.subscribe((value)=>{
      console.log("AssetGroups Coming from DropDown",value)
    })


    assetGroup.selectItem(new Event('change'),'AssetGroup-1');
    fixture.detectChanges();

   
    expect(nominationServiceMock.filterCustomers).toBeCalled();
    expect(nominationServiceMock.filterContracts).toBeCalled();
    expect(nominationServiceMock.filterTypes).toBeCalled();

    await expect(firstValueFrom(nominationServiceMock.customers$)).resolves.toEqual(['Customer-1']);
    await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual([]);
    await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);

  });

  // it('Setting Value of the assetgroup via UI and using nativeElement', async()=>{
  //   console.log("Setting Asset Group Value");

  //   const assetGroup = debugElemenet.query(By.css('.item-0 .p-element'));

  //   fixture.componentInstance.formGroup?.['controls']?.['assetGroup'].valueChanges.subscribe((value)=>{
  //     console.log("AssetGroups Coming from native Ellement =>",value)
  //   })

  //   assetGroup.nativeElement.value="AssetGroup-1";
  //   assetGroup.nativeElement.dispatchEvent(new Event('change'));
  //   fixture.detectChanges();

  
    
  //   // await expect( firstValueFrom(fixture.componentInstance.formGroup?.['controls']?.['assetGroup'].valueChanges)
  //   // ).resolves.toBe('AssetGroup-1');
  //   expect(nominationServiceMock.filterCustomers).toBeCalled();
  //   expect(nominationServiceMock.filterContracts).toBeCalled();
  //   expect(nominationServiceMock.filterTypes).toBeCalled();

  //   await expect(firstValueFrom(nominationServiceMock.customers$)).resolves.toEqual(['Customer-1']);
  //   await expect(firstValueFrom(nominationServiceMock.contracts)).resolves.toEqual([]);
  //   await expect(firstValueFrom(nominationServiceMock.types$)).resolves.toEqual([]);

  // });

});
