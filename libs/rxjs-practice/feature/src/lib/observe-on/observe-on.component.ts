import { Component, OnInit } from '@angular/core';
import { asyncScheduler, from, observeOn, of } from 'rxjs';

@Component({
  selector: 'angular-concepts-nx-observe-on',
  templateUrl: './observe-on.component.html',
  styleUrls: ['./observe-on.component.scss']
})
export class ObserveOnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const obs$ = from([1,2,3,4,5,6,7,8,9,10,11,12,13,12,15],asyncScheduler);
    // obs$.subscribe(console.log);
    // setTimeout(()=>console.log("SetTimeout Ran"),0);
    const obs$ = from([1,2,3,4,5,6,7,8,9,10,11,12,13,12,15]).pipe(observeOn(asyncScheduler));
    obs$.subscribe(console.log);
    setTimeout(()=>console.log("SetTimeout Ran"),0);

    const newPromise = new Promise((resolve,reject)=>{
      reject(5);
    });
    newPromise.then((val)=>console.log(val))
    .catch(err=>err).then((val)=>console.log("After catch",val))
    
  }

}

