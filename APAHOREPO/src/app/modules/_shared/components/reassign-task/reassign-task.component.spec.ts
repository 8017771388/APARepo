import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignTaskComponent } from './reassign-task.component';

describe('ReassignTaskComponent', () => {
  let component: ReassignTaskComponent;
  let fixture: ComponentFixture<ReassignTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReassignTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
