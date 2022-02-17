import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReorderComponent } from './task-reorder.component';

describe('TaskReorderComponent', () => {
  let component: TaskReorderComponent;
  let fixture: ComponentFixture<TaskReorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskReorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
