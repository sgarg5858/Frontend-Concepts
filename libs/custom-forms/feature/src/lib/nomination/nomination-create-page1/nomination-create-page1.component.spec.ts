// import { Component, DebugElement, NO_ERRORS_SCHEMA, Output,EventEmitter } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { PanelModule } from 'primeng/panel';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations'
// import { NominationCreatePage1Component } from './nomination-create-page1.component';


// @Component(
//   {selector:'angular-concepts-nx-nomination-header',
//   template:'',
//   providers:[
//     {
//       provide:NG_VALUE_ACCESSOR,
//       useExisting:NominationHeaderStub,
//       multi:true
//     }
//   ]
// }
// )
// class NominationHeaderStub{

//   @Output() valueChanged = new EventEmitter<{control:string,value:string}>();

// }

// @Component({selector:'angular-concepts-nx-marine-details',template:''})
// class MarineDetailsStub{
  
// }

// describe('NominationCreatePage1Component', () => {
//   let component: NominationCreatePage1Component;
//   let fixture: ComponentFixture<NominationCreatePage1Component>;
//   let debugElement:DebugElement;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports:[ReactiveFormsModule,PanelModule,NoopAnimationsModule],
//       declarations: [ NominationCreatePage1Component ],
//       schemas:[NO_ERRORS_SCHEMA]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NominationCreatePage1Component);
//     component = fixture.componentInstance;

//     debugElement=fixture.debugElement;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should show Marine Details Panel Component when marine details set to true',()=>{

//     let panelElement = debugElement.query(By.css('.marineDetails'));
//     // console.log(panelElements);
//     expect(panelElement).toBeNull();
//     component.showMarineDetails=true;
//     fixture.detectChanges();
//     panelElement = debugElement.query(By.css('.marineDetails'));
//     expect(panelElement).toBeDefined();
//   })
// });
