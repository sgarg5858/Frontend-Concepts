import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../../types/control-value-accessor-base';

export interface Item{
  facility:string;
  product:string,
  quantity:number
}

@Component({
  selector: 'angular-concepts-nx-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:OrderItemsComponent
    }
  ]
})
export class OrderItemsComponent extends ControlValueAccessorBase implements OnInit {

  constructor() { 
    super();
  }

  @Output() totalChanged = new EventEmitter<number>();

  createForm()
  {
    this.formGroup = new FormGroup({
      items: new FormArray([]),
      total:new FormControl()
    });

    (this.formGroup?.['controls']?.['items'] as FormArray).valueChanges.subscribe((items:Item[])=>{
      let total = this.getTotalQuantity(items);
      this.formGroup?.['controls']?.['total'].setValue(total);
      this.totalChanged.emit(total);
      console.log("Total changed Emit",total);
    })

  }

  getTotalQuantity(items:Item[])
  {
    return items
                .map(item => Number(item.quantity))
                .reduce((totalSoFar,curr)=> totalSoFar+curr);
  }

  addItem() {
    (this.formGroup?.['controls']?.['items'] as FormArray).push(
      new FormControl({
        facility: '',
        product: '',
        quantity: 0,
      })
    );
  }

  removeItem(index: number) {
    (this.formGroup?.['controls']?.['items'] as FormArray).removeAt(index);
  }

  getItems() {
    return (this.formGroup?.['controls']?.['items'] as FormArray).controls as FormControl[];
  }

  ngOnInit(): void {
    this.createForm();
  }

}
