import { TestBed } from '@angular/core/testing';

import { ViewDealService } from './view-deal.service';

describe('ViewDealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewDealService = TestBed.get(ViewDealService);
    expect(service).toBeTruthy();
  });
});
