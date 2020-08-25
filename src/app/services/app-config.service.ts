import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from '@interfaces/appConfig';

@Injectable()
export class AppConfigService {
	private appConfig: IAppConfig;

	constructor(private http: HttpClient) {}

	/**
	 * Gets application configuration.
	 * @returns Application configuration.
	 */
	get config(): IAppConfig {
		return this.appConfig;
	}

	/**
	 * Loads application configuration.
	 */
	async loadAppConfig(): Promise<void> {
		this.appConfig = await this.http.get<IAppConfig>('app.config.json').toPromise();
	}
}
