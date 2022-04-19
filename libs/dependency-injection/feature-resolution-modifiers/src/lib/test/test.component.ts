import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'angular-concepts-nx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private loggerService:LoggerService) {
    this.loggerService.log();
   }

  ngOnInit(): void {
  }

}
