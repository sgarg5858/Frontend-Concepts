import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheepComponent } from './sheep/sheep.component';
import { FarmComponent } from './farm/farm.component';
import { RouterModule } from '@angular/router';
import { MySheepBlueprintDirective } from './my-sheep-blueprint.directive';
import { SingleSlotComponent } from './single-slot/single-slot.component';
import { MultiSlotComponent } from './multi-slot/multi-slot.component';
import { ConditionalComponent } from './conditional/conditional.component';
import { NgProjectAsComponent } from './ng-project-as/ng-project-as.component';
import { CondiitonalDirectiveComponent } from './condiitonal-directive/condiitonal-directive.component';
import { IconInputComponent } from './icon-input/icon-input.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:FarmComponent
      }
    ])
  ],
  declarations: [
    SheepComponent,
    FarmComponent,
    MySheepBlueprintDirective,
    SingleSlotComponent,
    MultiSlotComponent,
    ConditionalComponent,
    NgProjectAsComponent,
    CondiitonalDirectiveComponent,
    IconInputComponent,
  ],
})
export class ContentProjectionFeatureModule {}
