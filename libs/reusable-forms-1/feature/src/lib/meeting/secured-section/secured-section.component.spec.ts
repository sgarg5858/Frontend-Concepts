import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredSectionComponent } from './secured-section.component';

describe('SecuredSectionComponent', () => {
  let component: SecuredSectionComponent;
  let fixture: ComponentFixture<SecuredSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuredSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuredSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
