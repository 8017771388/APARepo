import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildDealComponent } from './build-deal.component';

describe('BuildDealComponent', () => {
  let component: BuildDealComponent;
  let fixture: ComponentFixture<BuildDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
