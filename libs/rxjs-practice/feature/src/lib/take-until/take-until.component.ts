import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'angular-concepts-nx-take-until',
  templateUrl: './take-until.component.html',
  styleUrls: ['./take-until.component.scss']
})
export class TakeUntilComponent implements OnInit,OnDestroy {

  constructor() { }
  unsubscribe$= new Subject<void>();
  interval$ = interval(1000);
  ngOnInit(): void {
    this.interval$.pipe(takeUntil(this.unsubscribe$)).subscribe(console.log);
  }
  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
}
