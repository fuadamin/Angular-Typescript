import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class GeneralHttpService {
  constructor(private http: Http) { }
  getRequest (request:string) { return this.http.get(request).map(response => response.json()) } 
}