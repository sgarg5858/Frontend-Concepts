import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondiitonalDirectiveComponent } from './condiitonal-directive.component';

describe('CondiitonalDirectiveComponent', () => {
  let component: CondiitonalDirectiveComponent;
  let fixture: ComponentFixture<CondiitonalDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondiitonalDirectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondiitonalDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
