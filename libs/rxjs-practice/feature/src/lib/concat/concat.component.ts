import { Component, OnInit } from '@angular/core';
import { asyncScheduler, combineLatest, concat, delay, from, Observable, Observer, of, timer } from 'rxjs';

@Component({
  selector: 'angular-concepts-nx-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.scss']
})
export class ConcatComponent implements OnInit {

  constructor() { }

  // firstTimer = of("First Observble emitting its only value").pipe(delay(1000)) 
  
  firstTimer = Observable.create((obs:Observer<number>)=>{
    obs.next(100);
    setTimeout(()=>{
    obs.next(200);
    obs.error("Something Went wrong")
    },1000)
  })
  secondTimer = timer(500, 1000); 
  concatTimers = concat(this.firstTimer, this.secondTimer);

  ngOnInit(): void {
  }

}
