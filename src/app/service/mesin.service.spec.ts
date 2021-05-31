import { TestBed } from '@angular/core/testing';

import { MesinService } from './mesin.service';

describe('MesinService', () => {
  let service: MesinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
