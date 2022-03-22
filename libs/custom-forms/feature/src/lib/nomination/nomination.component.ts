import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SecurityService, UserRole } from '../security.service';
import { Item } from './order-items/order-items.component';


// function greet(person: string | string[]): string | string[] {
//   if (typeof person === 'string') {
//     return `Hello, ${person}!`;
//   } else if (Array.isArray(person)) {
//     return person.map(name => `Hello, ${name}!`);
//   }
//   throw new Error('Unable to greet');
// }

// Overload signatures
function greet(person: string): string;
function greet(persons: string[]): string[];
 
// Implementation signature
function greet(person: unknown): unknown {
  if (typeof person === 'string') {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map(name => `Hello, ${name}!`);
  }
  throw new Error('Unable to greet');
}

let res =greet(['Jane', 'Joe']);
console.log(res);


type NumberToStringConverter = {
  convert: (value: number) => string;
}

type BidirectionalStringNumberConverter = NumberToStringConverter & {
  convert: (value: string) => number;
}

@Component({
  selector: 'angular-concepts-nx-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.scss']
})
export class NominationComponent implements OnInit {

  constructor(private securityService:SecurityService) { }

  formGroup!:FormGroup;
  step=1;

  receipts:Item[]=[];
  deliveries:Item[]=[];

  ngOnInit(): void {
    this.createForm();
  }
  createForm()
  {
    this.formGroup = new FormGroup({
      step1: new FormControl(),
      step2: new FormControl(),
      step3: new FormControl()
    })
  }

  handleNext() {
   if(this.step==1)
   {
    this.step = 2;
    console.log(
      this.formGroup,
      this.formGroup.value,
      this.formGroup.controls?.['step1'].value
    )
    let nomHeader = this.formGroup?.['controls']?.['step1']?.value?.nominationHeader;
    this.formGroup?.['controls']?.['step2'].patchValue({
      nominationHeader: nomHeader,
      ledger: null,
    });
   }
   else if(this.step==2)
   {
     this.step=3;
     console.log(
      this.formGroup,
      this.formGroup.value,
      this.formGroup.controls?.['step2'].value
    )

    let nomHeader = this.formGroup?.['controls']?.['step2']?.value?.nominationHeader;

    let ledger =  this.formGroup?.['controls']?.['step2']?.value?.ledger;
    if(ledger)
    {
      this.deliveries = ledger.deliveries && ledger.deliveries.items && ledger.deliveries.items.length > 0 ?  ledger.deliveries.items :[];
      this.receipts = ledger.receipts && ledger.receipts.items && ledger.receipts.items.length > 0 ?  ledger.receipts.items :[];
      console.log(this.deliveries,this.receipts);
    }

    this.formGroup?.['controls']?.['step3'].patchValue({
      nominationHeader: nomHeader
    });

   }
  }

  handlePrevious() {
    this.step = this.step -1;
  }


  changeSecurityContext(data:UserRole) {

    this.securityService.securityContext={
      role:data
    }

  }

}
