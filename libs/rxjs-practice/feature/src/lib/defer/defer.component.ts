import { Component, OnInit } from '@angular/core';
import { combineLatest, defer, timer } from 'rxjs';

@Component({
  selector: 'angular-concepts-nx-defer',
  templateUrl: './defer.component.html',
  styleUrls: ['./defer.component.scss']
})
export class DeferComponent implements OnInit {

  constructor() { }

  
  deferedObservable = defer(()=> new Promise<string>((resolve,reject)=>{
    resolve("Defered Promise");
  }))

  ngOnInit(): void {
    this.deferedObservable.subscribe(console.log)

  }

}
