import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssurancePlanComponent } from './assurance-plan.component';

describe('AssurancePlanComponent', () => {
  let component: AssurancePlanComponent;
  let fixture: ComponentFixture<AssurancePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssurancePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssurancePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
