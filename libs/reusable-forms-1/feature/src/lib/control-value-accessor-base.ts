import { ControlValueAccessor, FormGroup } from "@angular/forms";

export  class ControlValueBaseAccessor implements ControlValueAccessor
{
    formGroup!:FormGroup;
    onTouchedCallback!:Function;

    writeValue(obj: any): void {
        
        if(obj)
        {
            this.formGroup.setValue(obj);
        }

    }
    registerOnChange(fn: any): void {
        this.formGroup?.valueChanges.subscribe((v)=>fn(v));
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
}