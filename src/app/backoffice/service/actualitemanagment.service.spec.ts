import { TestBed } from '@angular/core/testing';

import { ActualitemanagmentService } from './actualitemanagment.service';

describe('ActualitemanagmentService', () => {
  let service: ActualitemanagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualitemanagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
