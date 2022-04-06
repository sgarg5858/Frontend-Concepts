import { Component, OnInit } from '@angular/core';
import { combineLatest, of, timer } from 'rxjs';

@Component({
  selector: 'angular-concepts-nx-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.scss']
})
export class CombineLatestComponent implements OnInit {

  constructor() { }

  firstTimer=of(10,20,30,40);
  secondTimer = timer(500, 1000); 
  combinedTimers = combineLatest([this.firstTimer, this.secondTimer]);


  ngOnInit(): void {
    // this.combinedTimers.subscribe(value => console.log(value));

  }

}
