import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'admin' | 'user';

export interface ISecurityContext {
  role: UserRole
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  currentSecurityContext: ISecurityContext = {
    role: 'admin',
  };
  securityContextSubject: BehaviorSubject<ISecurityContext> =
    new BehaviorSubject(this.currentSecurityContext);

  securityContext$ = this.securityContextSubject.asObservable();

  get securityContext(): ISecurityContext {
    return this.currentSecurityContext;
  }

  set securityContext(security: ISecurityContext) {
    this.currentSecurityContext = security;
    this.securityContextSubject.next(security);
  }

  get securityContextChanges$() {
    return this.securityContext$;
  }

}
