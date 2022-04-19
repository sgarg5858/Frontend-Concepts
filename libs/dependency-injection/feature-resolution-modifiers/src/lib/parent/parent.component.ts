import { Component, Injector, OnInit } from '@angular/core';
import { AppConfig, APP_CONFIG, FamilyService } from '../family.service';
import { RelationToChildService } from '../relation-to-child.service';
import { RELATION } from '../relation.token';

@Component({
  selector: 'angular-concepts-nx-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  providers:[
    FamilyService,
    RelationToChildService,
    {
      provide:RELATION,
      useFactory:(injector:Injector)=>{
       const appConfig=injector.get(APP_CONFIG);
       if(appConfig.experimental)
       {
         return injector.get(FamilyService);
       }
       return injector.get(RelationToChildService);
      },
      deps:[Injector]
    }
  ]
  
})
export class ParentComponent implements OnInit {

  constructor(private relationService:RelationToChildService) {
    // this.relationService.relationToChild="Child";
   }

  ngOnInit(): void {
  }

}
