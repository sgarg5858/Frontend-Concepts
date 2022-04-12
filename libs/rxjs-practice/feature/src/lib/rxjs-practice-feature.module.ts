import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { DeferComponent } from './defer/defer.component';
import {RouterModule} from '@angular/router';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ConcatComponent } from './concat/concat.component';
import { MergeComponent } from './merge/merge.component';
import { ZipComponent } from './zip/zip.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { TakeUntilComponent } from './take-until/take-until.component';
import { ObserveOnComponent } from './observe-on/observe-on.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:ParentComponent,
        children:[
          {
            path:'defer',
            component:DeferComponent
          },
          {
            path:'concat',
            component:ConcatComponent
          },
          {
            path:'merge',
            component:MergeComponent
          },
          {
            path:'combine-latest',
            component:CombineLatestComponent
          },
          {
            path:'zip',
            component:ZipComponent
          },
          {
            path:'error-handling',
            component:ErrorHandlingComponent
          },
          {
            path:'take-until',
            component:TakeUntilComponent
          },{
            path:'observe-on',
            component:ObserveOnComponent
          }
        ]
      }
    ])
  ,],
  declarations: [
    ParentComponent,
    DeferComponent,
    CombineLatestComponent,
    ConcatComponent,
    MergeComponent,
    ZipComponent,
    ErrorHandlingComponent,
    TakeUntilComponent,
    ObserveOnComponent
  ],
})
export class RxjsPracticeFeatureModule {}
