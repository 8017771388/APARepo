import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuyerProfileComponent } from './create-buyer-profile.component';

describe('CreateBuyerProfileComponent', () => {
  let component: CreateBuyerProfileComponent;
  let fixture: ComponentFixture<CreateBuyerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBuyerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuyerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
