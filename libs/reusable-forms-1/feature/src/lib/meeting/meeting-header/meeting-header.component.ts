import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, combineLatestWith } from 'rxjs';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { MeetingDataService } from '../../meeting-data.service';
import { ControlType, SmartFormControl } from '../../types';

@Component({
  selector: 'angular-concepts-nx-meeting-header',
  templateUrl: './meeting-header.component.html',
  styleUrls: ['./meeting-header.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useClass:MeetingHeaderComponent,
      multi:true
    }
  ]
})
export class MeetingHeaderComponent extends FormGeneratorComponent implements OnInit,OnDestroy {


  @Input()
  set vessel(value:any) {
    this.formGroup?.controls?.['vessel']?.setValue(value);
  }

  constructor(private meetingDataService:MeetingDataService, private datePipe:DatePipe) {
    super()
   }

   override ngOnInit(): void {
      this.createForm();
       super.ngOnInit();
   }

   createForm()
   {
     this.formGroup = new FormGroup({
       assetGroup: new SmartFormControl({
         type:ControlType.DropDown,
         caption:'Asset Group:',
         options: this.meetingDataService.assetGroup$,
         onChange: this.meetingDataService.filterCustomers.bind(
           this.meetingDataService
         )
       }),

       customers: new SmartFormControl({
        type: ControlType.DropDown,
        caption: 'Customer:',
        options: this.meetingDataService.customers$,
      }),

      startDate: new SmartFormControl({
        caption: 'StartDate:',
        type: ControlType.Date,
        format: this.datePipe.transform,
      }),

      endDate: new SmartFormControl({
        caption: 'EndDate:',
        type: ControlType.Date,
        format: this.datePipe.transform,
      }),

      contract: new SmartFormControl({
        type: ControlType.DropDown,
        caption: 'Contract:',
        options: this.meetingDataService.contracts,
        onChange: this.meetingDataService.filterTypes.bind(
          this.meetingDataService
         )}),

        type: new SmartFormControl({
          caption: 'Type:',
          type: ControlType.DropDown,
          options: this.meetingDataService.types$,
        }),

        vessel: new SmartFormControl({
          caption: 'Vessel:',
          type: ControlType.Label,
          showWhen: () => this.isReadOnly,
        })
      })



      this.formGroup.controls?.['customers'].valueChanges
      .pipe(
        combineLatestWith(
          this.formGroup.controls?.['startDate'].valueChanges,
          this.formGroup.controls?.['endDate'].valueChanges
        )
      ).subscribe((data)=>{
        console.log("Changed",data);
        this.meetingDataService.filterContracts(...data);
      })
   }

   override ngOnDestroy(): void {
       super.ngOnDestroy();
   }


}
