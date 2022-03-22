import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../../types/control-value-accessor-base';

@Component({
  selector: 'angular-concepts-nx-nomination-create-page2',
  templateUrl: './nomination-create-page2.component.html',
  styleUrls: ['./nomination-create-page2.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:NominationCreatePage2Component
    }
  ]
})
export class NominationCreatePage2Component extends ControlValueAccessorBase implements OnInit {

  balanceInfo:any={
    balanced:true
  }

  constructor() {
    super();
   }

  ngOnInit(): void {
    this.createForm();
  }

  createForm()
  {
    this.formGroup = new FormGroup({
      nominationHeader : new FormControl(),
      ledger: new FormControl()
    })
  }

  handleBalanceChanged(data:any)
  {
    console.log("Balance",data);
    this.balanceInfo=data
  }
}
