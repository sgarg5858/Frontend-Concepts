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
        loadChildren: ()=> import('@angular-concepts-nx/structural-directives/feature').then(m=>m.StructuralDirectivesFeatureModule),
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
