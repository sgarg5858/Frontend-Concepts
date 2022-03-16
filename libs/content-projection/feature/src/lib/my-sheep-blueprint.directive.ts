import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mySheepBlueprint]'
})
export class MySheepBlueprintDirective {

  constructor(public templateRef:TemplateRef<any>) {
   }

}
