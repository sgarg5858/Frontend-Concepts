import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SmartFormControl } from '../types';

@Component({
  selector: 'angular-concepts-nx-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FormGeneratorComponent implements OnInit,ControlValueAccessor,Validators,OnDestroy {

  constructor() { }

  @Input() isReadOnly:boolean=false;
  @Input() securityContext!: { role: 'admin' | 'user' };

  @Output() valueChanged: EventEmitter<{control:string,value:any}> = new EventEmitter();
  
  controls:SmartFormControl[]=[];

  takeUntil= new Subject<any>();

  formGroup!:FormGroup;

  onChangeSubs = new Subscription();

  layout = 'layout';

  onTouchedCallback = () => {};

  //To Implement
  validate(control:AbstractControl):ValidationErrors | null {
    if (!this.formGroup.errors) {
      return this.formGroup.errors;
    } else {
      return null;
    }
  }


  writeValue(obj: any): void {
    console.log("Writting Value to Form");
    if(obj)
    {
      this.formGroup.setValue(obj);
    }
  }
  registerOnChange(fn: any): void {
    console.log("OnChange Registered");
    this.onChangeSubs.add(
      this.formGroup?.valueChanges?.subscribe((value)=> fn(value) )
    )
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback=fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  getControls() {
    this.controls = [];
    Object.keys(this.formGroup.controls).forEach((key) =>
      this.controls.push(this.formGroup.get(key) as SmartFormControl)
    );

    return this.controls;
  }

  ngOnInit(): void {
    console.log("Layout",this.layout);

    Object
    .keys(this.formGroup.controls)
    .forEach((key)=>{

      this.formGroup
      .get(key)?.valueChanges
      .pipe(takeUntil(this.takeUntil))
      .subscribe((value)=>{

        console.log(`Firing ${key} control value:`,value);
        this.valueChanged.emit({control:key,value:value});

      })
    })
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

  ngOnDestroy(): void {
      this.onChangeSubs.unsubscribe();
      this.takeUntil.next("unsubscribe all subs");
  }

}
