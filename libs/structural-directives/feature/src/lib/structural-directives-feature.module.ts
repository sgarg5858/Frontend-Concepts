import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ShowMyContentAfterDelayDirective } from './show-my-content-after-delay.directive';
import{RouterModule} from '@angular/router'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:TestComponent
      }
    ])
  ],
  declarations: [
    TestComponent,
    ShowMyContentAfterDelayDirective
  ],
})
export class StructuralDirectivesFeatureModule {}
