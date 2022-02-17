import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorProfileComponent } from './advisor-profile.component';

describe('AdvisorProfileComponent', () => {
  let component: AdvisorProfileComponent;
  let fixture: ComponentFixture<AdvisorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
