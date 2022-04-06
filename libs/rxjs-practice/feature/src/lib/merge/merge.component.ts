import { Component, OnInit } from '@angular/core';
import { merge, Observable, Observer, of, timer } from 'rxjs';

@Component({
  selector: 'angular-concepts-nx-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss']
})
export class MergeComponent implements OnInit {


  // firstTimer = Observable.create((obs:Observer<number>)=>{
  //   obs.next(100);
  //   setTimeout(()=>{
  //   obs.next(200);
  //   obs.error("Something Went wrong")
  //   },1000)
  // })
  firstTimer=of(1,23);
  secondTimer = timer(500, 1000); 
  mergeTimers = merge(this.firstTimer, this.secondTimer);

  constructor() { }

  ngOnInit(): void {
  }

}
