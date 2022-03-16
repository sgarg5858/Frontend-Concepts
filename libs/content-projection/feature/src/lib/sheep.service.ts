import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheepService {

  private instances=0;

  
  public getInstances()
  {
    return this.instances;
  }
  public incrementInstance()
  {
    console.log("Creating Sheep");
    this.instances++;
  }
  public decrementInstance()
  {
    this.instances--;
  }
  constructor() { }
}
