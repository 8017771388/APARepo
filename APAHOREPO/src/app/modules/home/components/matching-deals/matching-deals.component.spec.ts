import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingDealsComponent } from './matching-deals.component';

describe('MatchingDealsComponent', () => {
  let component: MatchingDealsComponent;
  let fixture: ComponentFixture<MatchingDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
