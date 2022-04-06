import { Component, OnInit } from '@angular/core';
import {  asyncScheduler, from, Observable, observeOn, of, } from 'rxjs';
@Component({
  selector: 'angular-concepts-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shell';

  // observable = new Observable((observer) => {
  //   observer.next(1);
  //   observer.next(2);
  //   observer.next(3);
  //   observer.complete();
  // }).pipe(
  //   observeOn(asyncScheduler)
  // );
  observable = from([1,2,3]).pipe(observeOn(asyncScheduler));

  
  ngOnInit(): void {
    console.log("Before Calling Subscibe")
   this.observable.subscribe((val)=>{
     console.log("Val",val);
    setTimeout(()=>{
      console.log("SetTimeout",val);
    },0)
   });
   console.log("After Calling Subscribe");
  }


}
