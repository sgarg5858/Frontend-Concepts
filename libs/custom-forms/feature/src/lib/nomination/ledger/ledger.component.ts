import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../../types/control-value-accessor-base';

@Component({
  selector: 'angular-concepts-nx-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:LedgerComponent
    }
  ]
})
export class LedgerComponent extends ControlValueAccessorBase implements OnInit {

  receiptsTotal = 0;
  delveriesTotal =0;
  @Output() balanceChanged = new EventEmitter<any>();
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formGroup = new FormGroup({
      deliveries: new FormControl(),
      receipts: new FormControl()
    })
  }
  handleReceiptsTotalChanged(total:number) {
    console.log('receipts changed', total);
    this.receiptsTotal = total;
    this.raiseBalanceChanged();
  }
  handlerDeliveriesTotalChanged(total:number) {
    this.delveriesTotal = total;
    this.raiseBalanceChanged();
  }

  raiseBalanceChanged() {
    this.balanceChanged.emit({
      receiptTotal: this.receiptsTotal,
      deliveriesTotal: this.delveriesTotal,
      balanced: this.receiptsTotal === this.delveriesTotal ? true : false,
    });
  }
}
