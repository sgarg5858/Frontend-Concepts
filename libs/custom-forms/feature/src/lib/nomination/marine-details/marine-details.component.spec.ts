import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import exp = require('constants');
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { NominationService } from '../../nomination.service';
import { NominationServiceMock } from '../nomination-header/nomination-header.component.spec';

import { MarineDetailsComponent } from './marine-details.component';

describe('MarineDetailsComponent', () => {
  let component: MarineDetailsComponent;
  let fixture: ComponentFixture<MarineDetailsComponent>;
  let nominationServiceMock:NominationService;
  let debugElement:DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineDetailsComponent ],
      providers:[
        {
          provide:NominationService,
          useClass:NominationServiceMock
        }
      ],
      imports:[
        ReactiveFormsModule,
        DropdownModule,
        PanelModule,
        InputTextModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineDetailsComponent);
    component = fixture.componentInstance;
    debugElement=fixture.debugElement;
    fixture.detectChanges();
    nominationServiceMock=TestBed.inject(NominationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('Should show Vesseloptions using waitForAsync',waitForAsync(()=>{

    // whenStable() is a promise that resolves when all pending async tasks are done and microtask and callback queue are empty
    fixture.whenStable().then(()=>{

      fixture.detectChanges();
      const vesselElement:Dropdown = debugElement.query(By.css('p-dropdown')).componentInstance;
      //Checking Vessel Options
      console.log("Vessel ",vesselElement.options)
      expect(vesselElement.options.length).toBe(2);
  
    })
    
  }));

  it('Should show Vesseloptions using fakeAsync',fakeAsync(()=>{

      flush();
      //OR
      // tick();
      fixture.detectChanges();

      const vesselElement:Dropdown = debugElement.query(By.css('p-dropdown')).componentInstance;
      //Checking Vessel Options
      console.log("Vessel ",vesselElement.options)
      expect(vesselElement.options.length).toBe(2);
  
    
  }));


  it('Should show Vessel and Length Controls and vessel options and selecting vessel should update length and length is readonly',fakeAsync(()=>{

    //tick => so that vessel observables emits as it is async obs now
    tick();
    //report data to view as we have to run CD manually...
    fixture.detectChanges();

    //Select Vessel Element....
    const vesselElement:Dropdown = debugElement.query(By.css('p-dropdown')).componentInstance;
    //Checking Vessel Options should be 2
    expect(vesselElement.options.length).toBe(2);

    //Getting Length Input Variable
    const lengthElement:HTMLInputElement = debugElement.query(By.css('.item-1 input')).nativeElement;

    //Checking Initial Value of Length Input both model and view
    expect(component.formGroup.controls?.['length'].value).toBe(null);
    expect(lengthElement.innerText).toBe(undefined);

    //Selecting Vessel Type and then checking Length property is updated or not....
    vesselElement.selectItem(new Event('change'), vesselElement.options[0]);
    fixture.detectChanges();

    expect(nominationServiceMock.getVesselLength).toBeCalled();
    expect(component.formGroup.controls?.['length'].value).toBe('100 ft');
    expect(lengthElement.value).toBe('100 ft');


    //Selecting Vessel Type and then checking Length property is updated or not....
    vesselElement.selectItem(new Event('change'), vesselElement.options[1]);
    fixture.detectChanges();

    expect(component.formGroup.controls?.['length'].value).toBe('200 ft');
    expect(lengthElement.value).toBe('200 ft');

    //checking  Readonly Length
    expect(lengthElement.readOnly).toBe(true);
    

  }));

  

});
