import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'angular-concepts-nx-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  step:number=1;

  formGroup= new FormGroup({
    step1: new FormControl(),
    step2: new FormControl()
  })

  //to implement
  handleNext()
  {
    this.step=2;
  }

  handlePrev()
  {
    this.step=1;
  }

}
