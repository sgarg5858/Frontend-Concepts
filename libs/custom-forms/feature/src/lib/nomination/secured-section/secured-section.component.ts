import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { SecurityService } from '../../security.service';
import { ControlType, SmartFormControl } from '../../types/basic-form-types';

@Component({
  selector: 'angular-concepts-nx-secured-section',
  templateUrl: './secured-section.component.html',
  styleUrls: ['./secured-section.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:SecuredSectionComponent
    }
  ]
})
export class SecuredSectionComponent extends FormGeneratorComponent implements OnInit,OnChanges {

  constructor(private sec: SecurityService) { 
    super();
  }

 override ngOnInit(): void {
    this.createForm();
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    console.log(changes);
    this.layout =changes?.['securityContext'].currentValue.role === 'admin'
      ? 'admin-layout'
      : 'user-layout';
      console.log("Secured Section LAyout",this.layout);
      

  }

  createForm() {
    this.formGroup = new FormGroup({
      user: new SmartFormControl({
        caption: 'Admin',
        type: ControlType.TextBox,
        showWhen: () => this.securityContext.role === 'admin',
      }),
      admin: new SmartFormControl({
        caption: 'User',
        type: ControlType.TextBox,
        showWhen: () =>
          this.securityContext.role === 'user' ||
          this.securityContext.role === 'admin',
      }),
    });
  }

}
