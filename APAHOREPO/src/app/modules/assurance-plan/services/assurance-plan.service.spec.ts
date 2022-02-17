import { TestBed } from '@angular/core/testing';

import { AssurancePlanService } from './assurance-plan.service';

describe('AssurancePlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssurancePlanService = TestBed.get(AssurancePlanService);
    expect(service).toBeTruthy();
  });
});
