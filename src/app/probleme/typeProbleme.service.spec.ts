import { TestBed } from '@angular/core/testing';

import { TypeProblemeService } from './typeProbleme.service';

describe('TypesproblemeService', () => {
  let service: TypeProblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
