import { Injectable } from '@angular/core';
import { Reporter } from './repoter.token';

@Injectable()
export class EngagingReporterService implements Reporter{

  constructor() { }
  report()
  {
    console.log("Engaging Report");
  }
}
