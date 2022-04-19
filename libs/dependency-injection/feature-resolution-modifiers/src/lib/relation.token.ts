import { InjectionToken } from "@angular/core";

export interface Relation{
    relationToChild:string;
}

export const RELATION = new InjectionToken<Relation>('Relation');