import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetComponent } from './task-det.component';

describe('TaskDetComponent', () => {
  let component: TaskDetComponent;
  let fixture: ComponentFixture<TaskDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
