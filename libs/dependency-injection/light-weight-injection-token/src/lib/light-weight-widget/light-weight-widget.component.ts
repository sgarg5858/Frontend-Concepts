import { Component, ContentChild, NgModule, OnInit } from '@angular/core';
import { LightWeightWidgetHeaderComponent } from '../light-weight-widget-header/light-weight-widget-header.component';

@Component({
  selector: 'angular-concepts-nx-light-weight-widget',
  templateUrl: './light-weight-widget.component.html',
  styleUrls: ['./light-weight-widget.component.scss']
})
export class LightWeightWidgetComponent implements OnInit {
  @ContentChild(LightWeightWidgetHeaderComponent) header:
  LightWeightWidgetHeaderComponent | undefined; 
  ngOnInit(): void {
  }
}
