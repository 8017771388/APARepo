import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssurancePlanListComponent } from './assurance-plan-list.component';

describe('AssurancePlanListComponent', () => {
  let component: AssurancePlanListComponent;
  let fixture: ComponentFixture<AssurancePlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssurancePlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssurancePlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
