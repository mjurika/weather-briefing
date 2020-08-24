import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface IBriefingState {
	key?: string;
}

const createInitialState = (): IBriefingState => {
	return {};
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'briefing', resettable: true })
export class BriefingStore extends Store<IBriefingState> {
	constructor() {
		super(createInitialState());
	}
}
