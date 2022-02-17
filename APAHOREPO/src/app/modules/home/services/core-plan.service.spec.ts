import { TestBed } from '@angular/core/testing';

import { CorePlanService } from './core-plan.service';

describe('CorePlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorePlanService = TestBed.get(CorePlanService);
    expect(service).toBeTruthy();
  });
});
