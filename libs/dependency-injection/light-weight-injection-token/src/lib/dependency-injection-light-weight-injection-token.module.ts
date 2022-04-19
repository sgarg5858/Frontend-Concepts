import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightWeightWidgetComponent } from './light-weight-widget/light-weight-widget.component';
import { LightWeightWidgetHeaderComponent } from './light-weight-widget-header/light-weight-widget-header.component';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LightWeightWidgetComponent,
    LightWeightWidgetHeaderComponent,
    WidgetHeaderComponent,
    WidgetComponent
  ],
  exports:[
    LightWeightWidgetComponent,
    WidgetComponent
  ]
})
export class DependencyInjectionLightWeightInjectionTokenModule {}
