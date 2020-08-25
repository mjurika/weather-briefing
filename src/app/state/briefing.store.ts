import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TMessageType } from '../interfaces/appConfig';

/**
 * Briefing store model.
 */
export interface IBriefingState {
	/**
	 * List of reports.
	 */
	reports: IReport[];
}

/**
 * Report entity.
 */
export interface IReport {
	/**
	 * List of identifiers of queries that produced this entry.
	 */
	refs?: string[];
	/**
	 * Type of query from which the entry is originating (e.g. TAF_LONGTAF)
	 */
	queryType: TMessageType;
	/**
	 * Type of the report (e.g. MSG_LONGTAF)
	 */
	reportType: string;
	/**
	 * Identifier of the report. Usually WMO/ICAO code for station or composite of AAZZZZ where AA is country code and ZZZZ is FIR/UIR or ATS.
	 */
	stationId: string;
	/**
	 * Report revision. Can be either COR or AMD.
	 */
	revision?: 'COR' | 'AMD';
	/**
	 * Place-ID for report station. If Place-ID is provided, stationId contains station identifier.
	 */
	placeId?: string;
	/**
	 * Text representation of report.
	 */
	text: string;
	/**
	 * HTML representation of text with colour coding.
	 */
	textHTML?: string;
	/**
	 * Reception time of report.
	 */
	receptionTime?: Date;
	/**
	 * Validity type of observation or issue time of report.
	 */
	reportTime?: Date;
	/**
	 * Start of validity range.
	 */
	validFrom?: string;
	/**
	 * End of validity range
	 */
	validEnd?: string;
}

const createInitialState = (): IBriefingState => {
	return {
		reports: []
	};
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'briefing', resettable: true })
export class BriefingStore extends Store<IBriefingState> {
	constructor() {
		super(createInitialState());
	}
}
