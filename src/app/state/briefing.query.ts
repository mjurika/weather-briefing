import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { BriefingStore, IBriefingState } from './briefing.store';

@Injectable({ providedIn: 'root' })
export class BriefingQuery extends Query<IBriefingState> {
	constructor(protected store: BriefingStore) {
		super(store);
	}
}
