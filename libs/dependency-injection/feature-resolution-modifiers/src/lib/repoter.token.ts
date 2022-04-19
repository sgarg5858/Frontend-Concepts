import { InjectionToken } from "@angular/core";
export interface Reporter{
    report : () => void;
}
export const REPORTERS = new InjectionToken<Reporter>('Reporters');