import { TestBed } from '@angular/core/testing';

import { GenerateInterviewService } from './generate-interview.service';

describe('GenerateInterviewService', () => {
  let service: GenerateInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
