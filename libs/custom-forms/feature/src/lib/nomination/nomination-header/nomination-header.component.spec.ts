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
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

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
        if(assetGroup == 'AssetGroup-1') 
        nominationServiceMock.customers$= of(['Customer-1']);
        else if(assetGroup == 'AssetGroup-2') 
        nominationServiceMock.customers$= of(['Customer-2'])
        else if(assetGroup == 'AssetGroup-3') 
        nominationServiceMock.customers$= of(['Customer-3'])
        else 
        nominationServiceMock.customers$= of([])
      }),
      filterContracts: jest.fn().mockImplementation((customer:string, startDate:Date, endDate:Date)=>{
        if(customer === 'Customer-1') 
        nominationServiceMock.contracts = of(['Contract-1']);
        else if(customer === 'Customer-2') 
        nominationServiceMock.contracts = of(['Contract-2']);
        else 
        nominationServiceMock.contracts = of([]);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the assetGroup field and its options',()=>{
    const assetGroup:Dropdown = debugElemenet.nativeElement.querySelector('.item-0 .p-element');
    console.log(assetGroup)
    
  })
});
