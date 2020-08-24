import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BriefingStore } from './briefing.store';

@Injectable({ providedIn: 'root' })
export class BriefingService {

  constructor(private briefingStore: BriefingStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.briefingStore.update(entities)));
  }

}
