/**
 * OPMET Query Service params.
 */
export interface IQueryParams {
	/**
	 * Identifier of query. Used to match results to queries from which they are originating.
	 */
	id?: string;
	/**
	 * Whether to colorize TAF/METAR reports. By default enabled, however may be disabled to improve the performance of large queries.
	 */
	colorize?: boolean;
	/**
	 * List of OPMET data types to be queried.
	 */
	reportTypes: string[];
	/**
	 * List of ICAO station identifiers.
	 */
	stations?: string[];
	/**
	 * List of country identifiers.
	 */
	countries?: string[];
}
