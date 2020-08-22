import { TestBed } from '@angular/core/testing';

import { NxtAppService } from './nxt-app.service';

describe('NxtAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NxtAppService = TestBed.get(NxtAppService);
    expect(service).toBeTruthy();
  });
});
