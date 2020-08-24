/**
 * Application configuration.
 */
export interface IAppConfig {
	/**
	 * OPMET Query Service url.
	 */
	queryUrl: string;
	/**
	 * Array of messafge types in default state.
	 */
	messageTypes: IMessageType[];
}

/**
 * Message type.
 */
export interface IMessageType {
	/**
	 * Name.
	 */
	name: TMessageType;
	/**
	 * Indicates whether is selected in form.
	 */
	selected: boolean;
	/**
	 * Value.
	 */
	value: TMessageType;
}

/**
 * Type of weather report.
 */
export type TMessageType = 'METAR' | 'SIGMET' | 'TAF';
