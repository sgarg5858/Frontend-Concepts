import { Component, OnInit } from '@angular/core';
import { RelationToChildService } from '../relation-to-child.service';

@Component({
  selector: 'angular-concepts-nx-grand-parent',
  templateUrl: './grand-parent.component.html',
  styleUrls: ['./grand-parent.component.scss'],
})
export class GrandParentComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

}
