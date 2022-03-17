import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplicitGridTemplateAreasComponent } from './explicit-grid-template-areas.component';

describe('ExplicitGridTemplateAreasComponent', () => {
  let component: ExplicitGridTemplateAreasComponent;
  let fixture: ComponentFixture<ExplicitGridTemplateAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplicitGridTemplateAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplicitGridTemplateAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
