import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import {DependencyInjectionLightWeightInjectionTokenModule} from '@angular-concepts-nx/dependency-injection/light-weight-injection-token';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    DependencyInjectionLightWeightInjectionTokenModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: ()=>import('@angular-concepts-nx/dependency-injection/feature-resolution-modifiers').then(m=>m.DependencyInjectionFeatureResolutionModifiersModule),
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
