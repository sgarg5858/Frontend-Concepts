import { Inject, Injectable } from '@angular/core';
import { Reporter, REPORTERS } from './repoter.token';

@Injectable()
export class LoggerService {

  constructor(@Inject(REPORTERS)private reporters:ReadonlyArray<Reporter>) { }

  log()
  {
    this.reporters.forEach((reporter)=>{
      reporter.report();
    })
  }
}
