import { Component, OnDestroy, OnInit } from '@angular/core';
import { SheepService } from '../sheep.service';

@Component({
  selector: 'angular-concepts-nx-sheep',
  templateUrl: './sheep.component.html',
  styleUrls: ['./sheep.component.scss']
})
export class SheepComponent implements OnInit,OnDestroy {

  instanceNumber:number=0;
  constructor(public sheepService:SheepService) { 
    this.sheepService.incrementInstance();
    this.instanceNumber=this.sheepService.getInstances();
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
      this.sheepService.decrementInstance();
  }

}
