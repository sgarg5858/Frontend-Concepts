import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingCreatePage1Component } from './meeting/meeting-create-page1/meeting-create-page1.component';
import { MeetingCreatePage2Component } from './meeting/meeting-create-page2/meeting-create-page2.component';
import { RouterModule } from '@angular/router';
import { MeetingHeaderComponent } from './meeting/meeting-header/meeting-header.component';
import { MarineDetailsComponent } from './meeting/marine-details/marine-details.component';
import { SecuredSectionComponent } from './meeting/secured-section/secured-section.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    RouterModule.forChild(
      [
        {
          path:'',
          component:MeetingComponent
        }
      ]
    ),
  ],
  declarations: [
    FormGeneratorComponent,
    MeetingComponent,
    MeetingCreatePage1Component,
    MeetingCreatePage2Component,
    MeetingHeaderComponent,
    MarineDetailsComponent,
    SecuredSectionComponent
  ],
  providers:[
    DatePipe
  ]
})
export class ReusableFormsFeatureModule {}
