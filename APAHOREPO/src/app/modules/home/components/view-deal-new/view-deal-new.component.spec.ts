import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDealNewComponent } from './view-deal-new.component';

describe('ViewDealNewComponent', () => {
  let component: ViewDealNewComponent;
  let fixture: ComponentFixture<ViewDealNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDealNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDealNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
