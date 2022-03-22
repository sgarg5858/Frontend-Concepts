import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISecurityContext } from '../../security.service';
import { ControlValueAccessorBase } from '../../types/control-value-accessor-base';

@Component({
  selector: 'angular-concepts-nx-nomination-create-page1',
  templateUrl: './nomination-create-page1.component.html',
  styleUrls: ['./nomination-create-page1.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:NominationCreatePage1Component
    }
  ]
})
export class NominationCreatePage1Component extends ControlValueAccessorBase implements OnInit,OnDestroy {


  showMarineDetails: boolean = false;
  isReadOnly = false;
  vesselSelected: string="";

  
  securityContext: ISecurityContext = { role: 'admin' };

  constructor() {
    super();
   }


   createForm() {
    this.formGroup = new FormGroup({
      nominationHeader: new FormControl(),
      marineDetails: new FormControl(),
      securedSection: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  nominationHeaderChanged(event:{control:string,value:any})
  {
    console.log(event);
    if (event.control === 'type') {
      if (event.value === 'Marine') {
        this.showMarineDetails = true;
      } else {
        this.showMarineDetails = false;
      }
    }
  }
  vesselChanged(event:{control:string,value:any})
  {
    this.vesselSelected=event.value;
  }

}
