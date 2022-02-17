import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorSubcriptionComponent } from './advisor-subcription.component';

describe('AdvisorSubcriptionComponent', () => {
  let component: AdvisorSubcriptionComponent;
  let fixture: ComponentFixture<AdvisorSubcriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorSubcriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorSubcriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
