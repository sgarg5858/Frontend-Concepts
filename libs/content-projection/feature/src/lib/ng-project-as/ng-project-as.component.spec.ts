import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgProjectAsComponent } from './ng-project-as.component';

describe('NgProjectAsComponent', () => {
  let component: NgProjectAsComponent;
  let fixture: ComponentFixture<NgProjectAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgProjectAsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgProjectAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
