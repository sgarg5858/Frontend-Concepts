import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../../types/control-value-accessor-base';
import { Item } from '../order-items/order-items.component';

@Component({
  selector: 'angular-concepts-nx-nomination-create-page3',
  templateUrl: './nomination-create-page3.component.html',
  styleUrls: ['./nomination-create-page3.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:NominationCreatePage3Component
    }
  ]
})
export class NominationCreatePage3Component extends ControlValueAccessorBase implements OnInit,OnDestroy {


  @Input() receipts:Item[]=[];
  @Input() deliveries:Item[]=[];

  constructor() { 
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm()
  {
    this.formGroup= new FormGroup({
      nominationHeader:new FormControl()
    })
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
