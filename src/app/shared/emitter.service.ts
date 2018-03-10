import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class EmitterService {
  private case = new Subject<any>(); case$ = this.case.asObservable();  
  publishData(data:any) { this.case.next(data) }
}
