import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumBuyerListComponent } from './premium-buyer-list.component';

describe('PremiumBuyerListComponent', () => {
  let component: PremiumBuyerListComponent;
  let fixture: ComponentFixture<PremiumBuyerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumBuyerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumBuyerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
