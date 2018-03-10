import { TestBed, inject } from '@angular/core/testing';

import { GeneralHttpService } from './general-http.service';

describe('GeneralHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralHttpService]
    });
  });

  it('should ...', inject([GeneralHttpService], (service: GeneralHttpService) => {
    expect(service).toBeTruthy();
  }));
});
