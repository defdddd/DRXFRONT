import { TestBed } from '@angular/core/testing';

import { InoviceService } from './inovice.service';

describe('InoviceService', () => {
  let service: InoviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InoviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
