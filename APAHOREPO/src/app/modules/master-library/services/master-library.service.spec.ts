import { TestBed } from '@angular/core/testing';

import { MasterLibraryService } from './master-library.service';

describe('MasterLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterLibraryService = TestBed.get(MasterLibraryService);
    expect(service).toBeTruthy();
  });
});
