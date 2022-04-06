import { Component, OnInit } from '@angular/core';
import { of, timer, zip } from 'rxjs';

@Component({
  selector: 'angular-concepts-nx-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.scss']
})
export class ZipComponent implements OnInit {

  constructor() { }

  firstTimer=of(10,20,30,40);
  secondTimer = timer(500, 1000); 
  zipped = zip(this.firstTimer, this.secondTimer);

  ngOnInit(): void {
  }

}
