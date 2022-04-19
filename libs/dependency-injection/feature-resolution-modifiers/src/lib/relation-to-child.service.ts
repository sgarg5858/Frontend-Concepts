import { Injectable } from '@angular/core';
export let count=1;
@Injectable()
export class RelationToChildService {

  relationToChild:string="Child";
  scope="root";
  constructor() { 
    console.log("Relation to Child Service",count++);
  }
  
}
