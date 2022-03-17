import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { RouterModule } from '@angular/router';
import { ExplicitGridComponent } from './explicit-grid/explicit-grid.component';
import { ExplicitGridTemplateAreasComponent } from './explicit-grid-template-areas/explicit-grid-template-areas.component';
import { ImplicitGridComponent } from './implicit-grid/implicit-grid.component';
import { AligningGridItemsComponent } from './aligning-grid-items/aligning-grid-items.component';

@NgModule({
  imports: 
  [CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:GridComponent
      },
      {
        path:'explicit',
        component:ExplicitGridComponent
      }
    ])
  ],
  declarations: [
    GridComponent,
    ExplicitGridComponent,
    ExplicitGridTemplateAreasComponent,
    ImplicitGridComponent,
    AligningGridItemsComponent
  ],
})
export class CssGridFeatureModule {}
