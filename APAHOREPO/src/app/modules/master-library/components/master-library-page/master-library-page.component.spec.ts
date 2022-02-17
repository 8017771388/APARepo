import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLibraryPageComponent } from './master-library-page.component';

describe('MasterLibraryPageComponent', () => {
  let component: MasterLibraryPageComponent;
  let fixture: ComponentFixture<MasterLibraryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLibraryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLibraryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
