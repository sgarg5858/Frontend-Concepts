import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: ()=> import('@angular-concepts-nx/rxjs-practice/feature').then(m=>m.RxjsPracticeFeatureModule),
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
