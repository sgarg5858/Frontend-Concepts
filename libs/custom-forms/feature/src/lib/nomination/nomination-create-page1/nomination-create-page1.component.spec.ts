import { Component, DebugElement, NO_ERRORS_SCHEMA, Output,EventEmitter } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import { NominationCreatePage1Component } from './nomination-create-page1.component';
import { MarineDetailsComponent } from '../marine-details/marine-details.component';
import { NominationService } from '../../nomination.service';
import { NominationServiceMock } from '../nomination-header/nomination-header.component.spec';
import { NominationHeaderComponent } from '../nomination-header/nomination-header.component';
import { DatePipe } from '@angular/common';
import { SecuredSectionComponent } from '../secured-section/secured-section.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import exp = require('constants');


describe('NominationCreatePage1Component', () => {
  let component: NominationCreatePage1Component;
  let fixture: ComponentFixture<NominationCreatePage1Component>;
  let debugElement:DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,PanelModule,NoopAnimationsModule, 
        DropdownModule,
        InputTextModule,
        ButtonModule,
        CalendarModule],
      declarations: [ NominationCreatePage1Component,MarineDetailsComponent,NominationHeaderComponent,SecuredSectionComponent ],
      providers:[
          DatePipe,
          {
              provide:NG_VALUE_ACCESSOR,
              useExisting:MarineDetailsComponent,
              multi:true
          },
          {
            provide:NG_VALUE_ACCESSOR,
            useExisting:NominationHeaderComponent,
            multi:true
        },
        {
            provide:NG_VALUE_ACCESSOR,
            useExisting:SecuredSectionComponent,
            multi:true
        },
        {
            provide:NominationService,
            useClass:NominationServiceMock
          }
      ],
    //   schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationCreatePage1Component);
    component = fixture.componentInstance;
    debugElement=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Marine Details Panel Component when marine details set to true',()=>{

    let panelElement = debugElement.query(By.css('.marineDetails'));
    // console.log(panelElements);
    expect(panelElement).toBeNull();
    component.showMarineDetails=true;
    fixture.detectChanges();
    panelElement = debugElement.query(By.css('.marineDetails'));
    expect(panelElement).toBeDefined();
  })


  it('should show Marine Details Panel Component when we select type to Marine',fakeAsync (()=>{

//    Point 1=> Intially there won't be marine details present.
    let marineDetailsPanelElement = debugElement.query(By.css('.marineDetails'));

    //Confirming point 1
    expect(marineDetailsPanelElement).toBeNull();

    //Point2 => After we select Marine in Type Dropdown of  Nomination Header it should show Marine Details
    //Component but there wont be any options available as we are using async observable to mock data
    // we have to call tick + fixture.detectChanges()  to push data and run change detection.
    let typeElement:Dropdown = debugElement.query(By.css('.item-5 p-dropdown')).componentInstance;
    console.log(typeElement,typeElement.options);
    typeElement.selectItem(new Event('change'),'Marine');

    fixture.detectChanges();


    marineDetailsPanelElement = debugElement.query(By.css('.marineDetails'));
    //We can find Marine details Panel component...
    expect(marineDetailsPanelElement).toBeDefined();

    //Vessel Element is also defined....
    let vesselElement:Dropdown = debugElement.query(By.css('.marineDetails .item-0 p-dropdown')).componentInstance;
    expect(vesselElement).toBeDefined();

    //Options are null until we call tick() as async observables wont push data until we call tick()
    expect(vesselElement.options).toBeNull();

    //tick is required for async observable to emit data;
    tick();
    fixture.detectChanges();

    vesselElement = debugElement.query(By.css('.marineDetails .item-0 p-dropdown')).componentInstance;

    console.log(vesselElement.options);
    expect(vesselElement.options.length).toBe(2);



   
  }))
});
