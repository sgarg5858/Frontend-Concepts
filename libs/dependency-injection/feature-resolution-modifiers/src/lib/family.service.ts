import { Injectable, InjectionToken } from '@angular/core';

export let count=1;

@Injectable()
export class FamilyService {

  relationToChild:string="Family Child";
  scope="root";
  constructor() {
    console.log("Family Service",count++)
   }
}

export interface AppConfig{
  experimental:boolean;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG',{
  providedIn:'root',
  factory:()=>({experimental:true})
})