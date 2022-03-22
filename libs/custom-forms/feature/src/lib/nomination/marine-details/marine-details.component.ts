import { Component, OnInit } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { NominationService } from '../../nomination.service';
import { ControlType, SmartFormControl } from '../../types/basic-form-types';

@Component({
  selector: 'angular-concepts-nx-marine-details',
  templateUrl: './marine-details.component.html',
  styleUrls: ['./marine-details.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:MarineDetailsComponent
    }
  ]
})
export class MarineDetailsComponent extends FormGeneratorComponent implements OnInit {

  constructor(private nominationService:NominationService) {
    super()
   }


   createForm() {
    this.formGroup = new FormGroup({
      vessel: new SmartFormControl({
        caption: 'Vessel',
        type: ControlType.DropDown,
        options: this.nominationService.vessels$,
        onChange: this.updateVesselLength.bind(this),
      }),
      length: new SmartFormControl({
        caption: 'Length',
        type: ControlType.TextBox,
        readonlyWhen: () => true,
      }),
    });
  }

 override ngOnInit(): void {
   this.createForm();
   super.ngOnInit();
  }
  updateVesselLength(v: string) {
    let length = this.nominationService.getVesselLength(v);
    console.log('vessel', length);
    this.formGroup?.['controls']?.['length'].setValue(length);
  }

}
