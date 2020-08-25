import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applyTransaction, guid } from '@datorama/akita';
import { IFormData } from '../components/form/IFormData';
import { IJsonRPCRequest, IJsonRPCResponse } from '../interfaces/jsonRpc';
import { AppConfigService } from '../services/app-config.service';
import { BriefingStore, IReport } from './briefing.store';
import { IQueryParams } from './IQueryParams';

@Injectable({ providedIn: 'root' })
export class BriefingService {
	constructor(
		private briefingStore: BriefingStore, ////
		private http: HttpClient,
		private appConfigService: AppConfigService
	) {}

	/**
	 * Get briefing data.
	 * @param data Form data.
	 */
	get(data: IFormData): void {
		applyTransaction(() => {
			this.briefingStore.setLoading(true);
			this.briefingStore.setError(false);
		});

		const body = this.createRequestBody(data);
		this.http.post<IJsonRPCResponse<IReport[]>>(this.appConfigService.config.queryUrl, body).subscribe({
			next: (response) => {
				if (response.error) {
					this.handleError(response.error);
					return;
				}

				applyTransaction(() => {
					this.briefingStore.reset();
					this.briefingStore.setLoading(false);
					this.briefingStore.update({ reports: response.result });
				});
			},
			error: (error) => this.handleError
		});
	}

	/**
	 * Create request body for OPMET Query Service.
	 * @param data Form data.
	 * @param method Type of method, default query.
	 * @param colorize Whether colorize report, default false.
	 * @returns Query params in JSON-RPC format.
	 */
	private createRequestBody(data: IFormData, method: string = 'query', colorize: boolean = false): IJsonRPCRequest<IQueryParams> {
		return {
			method,
			id: guid(),
			params: [
				{
					colorize,
					reportTypes: data.messageTypes.filter((msg) => msg.selected).map((msg) => msg.value),
					stations: this.splitByWhiteSpace(data.spatial.airports),
					countries: this.splitByWhiteSpace(data.spatial.countries)
				}
			]
		};
	}

	/**
	 * Split string by whitespace.
	 * @param data String to split.
	 * @returns Array of string values or undefined.
	 */
	private splitByWhiteSpace(data?: string): string[] | undefined {
		if (!data || !data.trim()) {
			return;
		}
		return data.trim().split(/\s+/);
	}

	/**
	 * Error handler.
	 * @param error Error object.
	 */
	private handleError(error: any): void {
		// Log error
		console.error(error);

		applyTransaction(() => {
			this.briefingStore.setLoading(false);
			this.briefingStore.setError<boolean>(true);
		});
	}
}
