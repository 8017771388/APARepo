import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateDealComponent } from './initiate-deal.component';

describe('InitiateDealComponent', () => {
  let component: InitiateDealComponent;
  let fixture: ComponentFixture<InitiateDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
