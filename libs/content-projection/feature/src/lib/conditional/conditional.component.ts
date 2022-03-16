import { AfterContentChecked, Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'angular-concepts-nx-conditional',
  templateUrl: './conditional.component.html',
  styleUrls: ['./conditional.component.scss']
})
export class ConditionalComponent implements OnInit,AfterContentChecked {

  constructor() { }

  @ContentChild('mySheep') sheepTemplate: TemplateRef<any>|undefined;


  ngOnInit(): void {
  }
  ngAfterContentChecked(): void {
    console.log(this.sheepTemplate);
}

}
