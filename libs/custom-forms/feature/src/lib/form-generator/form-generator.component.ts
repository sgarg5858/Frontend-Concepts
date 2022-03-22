import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SmartFormControl } from '../types/basic-form-types';

@Component({
  selector: 'angular-concepts-nx-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FormGeneratorComponent implements OnInit, OnDestroy,ControlValueAccessor,Validators {

  constructor() { }

  @Input() securityContext:{role :'admin'|'user' }={role:'admin'};
  @Input() isReadOnly=false;
  @Output() valueChanged = new EventEmitter<{control:string,value:any}>();

  onChangeSubscriptions = new Subscription();
  //Initially Empty Function so that if we accidentally call it before
  //Angular passes the callback we dont get the error.
  //Plus we have to call it manually like we are calling
  //OnChangeCallback on valueChanges Blur event might be a good idea to inform 
  //touched to parent.
  onTouchedCallback = () => {};
  takeUntil$ = new Subject();

  formGroup!:FormGroup;
  controls:SmartFormControl[]=[];
  layout='layout';



  writeValue(obj: any): void {
    if(obj)
    {
      this.formGroup.setValue(obj);
    }
  }
  registerOnChange(fn: any): void {
   const sub = this.formGroup?.valueChanges.subscribe((value:any)=>{
     console.log("valueChanges",value);
      fn(value);
    })
    this.onChangeSubscriptions.add(sub);

  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback=fn;
  }

  setDisabledState(isDisabled:boolean)
  {
    if(isDisabled)
    {
      this.formGroup.disable();
    }
    else
    {
      this.formGroup.enable();
    }
  }
  //Check this Validator Implementation
  validate(control:AbstractControl):ValidationErrors|null{
    if(this.formGroup.errors)
    {
      return this.formGroup.errors
    }
    return null;
  }

  ngOnDestroy(): void {
    this.onChangeSubscriptions.unsubscribe();
    this.takeUntil$.next("");
  }

  getControls() {
    this.controls = [];
    Object.keys(this.formGroup?.controls).forEach((key) =>
      this.controls.push(this.formGroup?.get(key) as SmartFormControl)
    );

    return this.controls;
  }

  getValue(value:any) {
    let returned: any;
    switch (typeof value) {
      case 'function': {
        returned = value();
        break;
      }
      default: {
        returned = value;
      }
    }

    return returned;
  }

  getControlValue(controlKey:string) {
    return this.formGroup?.['controls']?.[controlKey].value;
  }


  ngOnInit(): void {

    Object
    .keys(this.formGroup.controls)
    .forEach((key)=>{

      this.formGroup?.controls?.[key]?.valueChanges
      .pipe(
        takeUntil(this.takeUntil$)
      )
      .subscribe((value)=>{
        this.valueChanged.emit({control:key,value});
      })

    })


  }

}
