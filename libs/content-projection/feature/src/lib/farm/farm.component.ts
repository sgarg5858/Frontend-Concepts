import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'angular-concepts-nx-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

  constructor() { }
  sheepTemplate:TemplateRef<any>|undefined;

  ngOnInit(): void {
  }
  

}
