import { TestBed } from '@angular/core/testing';

import { BilingService } from './biling.service';

describe('BilingService', () => {
  let service: BilingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
