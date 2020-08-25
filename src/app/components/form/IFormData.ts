import { IMessageType } from '@interfaces/appConfig';

/**
 * Form data.
 */
export interface IFormData {
	/**
	 * Message types.
	 */
	messageTypes: IMessageType[];
	/**
	 * Group of spatial data.
	 */
	spatial: {
		/**
		 * ICAO codes of airports separated by space.
		 */
		stations: string;
		/**
		 * WMO codes of countries separated by space.
		 */
		countries: string;
	};
}
