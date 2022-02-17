import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterTasksComponent } from './add-master-tasks.component';

describe('AddMasterTasksComponent', () => {
  let component: AddMasterTasksComponent;
  let fixture: ComponentFixture<AddMasterTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMasterTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
