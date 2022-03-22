import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueBaseAccessor } from '../../control-value-accessor-base';

@Component({
  selector: 'angular-concepts-nx-meeting-create-page1',
  templateUrl: './meeting-create-page1.component.html',
  styleUrls: ['./meeting-create-page1.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useClass:MeetingCreatePage1Component,
      multi:true
    }
  ]
})
export class MeetingCreatePage1Component extends ControlValueBaseAccessor implements OnInit {

  constructor() {
    super();
   }

   showMarineDetails: boolean = false;
   isReadOnly: boolean=false;
   vesselSelected:string|undefined;
   securityContext: { role: 'admin' | 'user' } = { role: 'admin' };


  ngOnInit(): void {
    this.createForm();
  }

  createForm()
  {
    this.formGroup= new FormGroup({
      meetingHeader : new FormControl(),
      marineDetails: new FormControl(),
      securedSection: new FormControl()
    })
  }

  

}
