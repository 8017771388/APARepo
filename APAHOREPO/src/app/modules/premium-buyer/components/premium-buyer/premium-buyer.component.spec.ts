import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumBuyerComponent } from './premium-buyer.component';

describe('PremiumBuyerComponent', () => {
  let component: PremiumBuyerComponent;
  let fixture: ComponentFixture<PremiumBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
