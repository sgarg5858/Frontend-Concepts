import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatestWith } from 'rxjs';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { NominationService } from '../../nomination.service';
import { ControlType, SmartFormControl } from '../../types/basic-form-types';

@Component({
  selector: 'angular-concepts-nx-nomination-header',
  templateUrl: './nomination-header.component.html',
  styleUrls: ['./nomination-header.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:NominationHeaderComponent,
      multi:true
    }
  ]
})
export class NominationHeaderComponent extends FormGeneratorComponent implements OnInit,OnChanges,OnDestroy {


  @Input()
  set vessel(value:string) {
    this.formGroup?.['controls']?.['vessel'].setValue(value);
  }

  constructor(private datePipe:DatePipe, private nominationService:NominationService) { 
    super();
  }

   override ngOnInit(): void {
    this.createForm();
    super.ngOnInit();
  }

  createForm()
  {
    this.formGroup = new FormGroup({
      assetGroup: new SmartFormControl({
        type: ControlType.DropDown,
        caption: 'AssetGroup:',
        options: this.nominationService.assetGroup$,
        onChange: this.nominationService.filterCustomers.bind(
          this.nominationService
        ) 
      }),
      customer: new SmartFormControl({
        type: ControlType.DropDown,
        caption: 'Customer:',
        options: this.nominationService.customers$,
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
        options: this.nominationService.contracts,
        onChange: this.nominationService.filterTypes.bind(
          this.nominationService
        ),
      }),
      type: new SmartFormControl({
        caption: 'Type:',
        type: ControlType.DropDown,
        options: this.nominationService.types$,
      }),
      // this is only shown in nomination header in readonly mode else in marine details for edit mode.
      vessel: new SmartFormControl({
        caption: 'Vessel:',
        type: ControlType.Label,
        //Check this showWhen
        showWhen: () => this.isReadOnly,
      }),
    });

    this.formGroup?.['controls']?.['customer'].valueChanges
      .pipe(
        combineLatestWith(
          this.formGroup?.['controls']?.['startDate'].valueChanges,
          this.formGroup?.['controls']?.['endDate'].valueChanges
        )
      )
      .subscribe((data) => {
        console.log('changed', data);
        this.nominationService.filterContracts(...data);
      });

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.layout =
    changes['isReadOnly']?.currentValue === true
      ? 'read-only-layout'
      : 'layout';

  console.log('changes', changes, this.layout);
  }
  override ngOnDestroy(): void {
      
  }

}
