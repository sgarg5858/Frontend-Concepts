import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'angular-concepts-nx-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss']
})
export class ErrorHandlingComponent implements OnInit {

  constructor(private dataService:DataService) { }
  posts$ !:Observable<any[]> ;
  ngOnInit(): void {
   this.posts$ = this.dataService.getPosts();
  }

}
