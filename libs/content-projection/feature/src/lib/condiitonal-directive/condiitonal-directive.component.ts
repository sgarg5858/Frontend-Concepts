import { AfterContentChecked, Component, ContentChild, OnInit } from '@angular/core';
import { MySheepBlueprintDirective } from '../my-sheep-blueprint.directive';

@Component({
  selector: 'angular-concepts-nx-condiitonal-directive',
  templateUrl: './condiitonal-directive.component.html',
  styleUrls: ['./condiitonal-directive.component.scss']
})
export class CondiitonalDirectiveComponent implements OnInit,AfterContentChecked {

  constructor() { }

  @ContentChild(MySheepBlueprintDirective) content!:MySheepBlueprintDirective;


  ngOnInit(): void {
  }
  ngAfterContentChecked(): void {
    console.log(this.content.templateRef);
}

}
