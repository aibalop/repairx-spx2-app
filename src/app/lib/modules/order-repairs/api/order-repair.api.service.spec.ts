import { TestBed } from '@angular/core/testing';

import { OrderRepairApiService } from './order-repair.api.service';

describe('OrderRepairApiService', () => {
  let service: OrderRepairApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRepairApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
