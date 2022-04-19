import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { GrandParentComponent } from './grand-parent/grand-parent.component';
import {RouterModule} from '@angular/router'
import { REPORTERS } from './repoter.token';
import { BrowserReporterService } from './browser-reporter.service';
import { EngagingReporterService } from './engaging-reporter.service';
import { LoggerService } from './logger.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
      component:TestComponent
    }])
  ,],
  providers:[
    {provide:BrowserReporterService,useClass:BrowserReporterService},
    {provide:EngagingReporterService,useClass:EngagingReporterService},
    {provide:LoggerService,useClass:LoggerService},
  {provide:REPORTERS,useExisting:BrowserReporterService,multi:true},
  {provide:REPORTERS,useExisting:EngagingReporterService,multi:true}
  ],
  declarations: [
    TestComponent,
    ChildComponent,
    ParentComponent,
    GrandParentComponent
  ],
})
export class DependencyInjectionFeatureResolutionModifiersModule {}
