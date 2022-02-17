import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationPageComponent } from './valuation-page.component';

describe('ValuationPageComponent', () => {
  let component: ValuationPageComponent;
  let fixture: ComponentFixture<ValuationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
