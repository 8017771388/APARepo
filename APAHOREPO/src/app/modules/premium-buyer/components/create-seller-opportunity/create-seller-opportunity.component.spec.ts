import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellerOpportunityComponent } from './create-seller-opportunity.component';

describe('CreateSellerOpportunityComponent', () => {
  let component: CreateSellerOpportunityComponent;
  let fixture: ComponentFixture<CreateSellerOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSellerOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSellerOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
