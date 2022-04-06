import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { DeferComponent } from './defer/defer.component';
import {RouterModule} from '@angular/router';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ConcatComponent } from './concat/concat.component';
import { MergeComponent } from './merge/merge.component';
import { ZipComponent } from './zip/zip.component';
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
    ZipComponent
  ],
})
export class RxjsPracticeFeatureModule {}