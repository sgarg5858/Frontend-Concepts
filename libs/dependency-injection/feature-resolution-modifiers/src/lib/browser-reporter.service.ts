import { Injectable } from '@angular/core';
import { Reporter } from './repoter.token';

@Injectable()
export class BrowserReporterService implements Reporter {

  constructor() { }
  report()
  {
    console.log("Browser Report");
  }
}
