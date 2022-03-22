import { AsyncValidator, AsyncValidatorFn, FormControl, FormControlOptions, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs"


export enum ControlType {
    TextBox = 'TextBox',
    DropDown = 'DropDown',
    Date = 'Date',
    Label = 'Label',
    Injected = 'Injected',
  }

  type ContextCallback<T> = (context?:any) => T | Observable<T>;

  export interface EntityField{
      type: ControlType;
      caption?: string | ContextCallback<string>;
      options?: Observable<any>;
      showWhen?: ContextCallback<boolean>;
      onChange?: ContextCallback<void>;
      format?: (arg0: any) => any;
      readonlyWhen?: ContextCallback<boolean>
  }

  export interface EntityType{
      name:string;
      fields:Record<string,EntityField>;
  }

  export class SmartFormControl extends FormControl{
      constructor(
          public e:EntityField,
          formState?:any,
          validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions,
          asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
      )
      {
          super(formState,validatorOrOpts,asyncValidator);

          if(this.e.onChange)
          {
              console.log("onChangeCallbackAttached",this.e.onChange);
              this.valueChanges.subscribe((v)=>{
                  console.log('Value Changed',v);
                  
                  if(e.onChange)
                  {
                    e.onChange(v);
                  }
              })
          }


      }
  }