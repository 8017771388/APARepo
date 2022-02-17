import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicQuestionsComponent } from './basic-questions.component';

describe('BasicQuestionsComponent', () => {
  let component: BasicQuestionsComponent;
  let fixture: ComponentFixture<BasicQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
