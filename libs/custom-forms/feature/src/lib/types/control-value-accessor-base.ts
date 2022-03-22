import { ControlValueAccessor, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

export class ControlValueAccessorBase implements ControlValueAccessor {
    formGroup!: FormGroup;

    onTouchedCallBack!: Function;

    subscriptions:Subscription = new Subscription();

    constructor() {}
    writeValue(obj: any): void {
      if (obj) {
        this.formGroup.setValue(obj);
      }
    }

    registerOnChange(fn: any): void {
      const sub =this.formGroup?.valueChanges.subscribe((v) => fn(v));
      this.subscriptions.add(sub);  
    }

    registerOnTouched(fn: any): void {
      this.onTouchedCallBack = fn;
    }
    
    setDisabledState?(isDisabled: boolean): void {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
  }
  