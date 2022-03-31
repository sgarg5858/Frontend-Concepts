import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-concepts-nx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }
  showContent:boolean=true;
  delay=3000;
  toggleContent()
  {
    this.showContent=!this.showContent;
  }
  ngOnInit(): void {
  }

}
