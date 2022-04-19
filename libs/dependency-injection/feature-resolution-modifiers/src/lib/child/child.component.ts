import { Component, Host, Inject, OnInit } from '@angular/core';
import { RelationToChildService } from '../relation-to-child.service';
import { Relation, RELATION } from '../relation.token';

@Component({
  selector: 'angular-concepts-nx-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {

  constructor(@Host() @Inject(RELATION)private relationService:Relation) { 

    console.log(this.relationService.relationToChild);
  }

  ngOnInit(): void {
  }
  

}
