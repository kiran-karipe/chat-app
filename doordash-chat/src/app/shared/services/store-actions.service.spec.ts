import { TestBed } from '@angular/core/testing';

import { StoreActionsService } from './store-actions.service';

describe('StoreActionsService', () => {
  let service: StoreActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
