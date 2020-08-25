import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BriefingQuery } from '../../state/briefing.query';
import { IReport } from '../../state/briefing.store';

@Component({
	selector: 'app-briefing',
	templateUrl: './briefing.component.html',
	styleUrls: ['./briefing.component.scss']
})
export class BriefingComponent {
	loading$: Observable<boolean>;
	error$: Observable<boolean>;
	groupedReports?: { [key: string]: IReport[] };

	constructor(private briefingQuery: BriefingQuery) {
		this.loading$ = this.briefingQuery.selectLoading();
		this.error$ = this.briefingQuery.selectError();
		this.briefingQuery
			.select()
			.pipe(map((state) => this.groupReports(state.reports)))
			.subscribe((reports) => (this.groupedReports = reports));
	}

	/**
	 * Group reports by stationId.
	 * @param reports List of reports.
	 * @returns Grouped reports by stationId.
	 */
	private groupReports(reports: IReport[]): { [key: string]: IReport[] } | undefined {
		if (reports.length === 0) {
			return;
		}
		return reports.reduce((rv, x) => {
			(rv[x.stationId] = rv[x.stationId] || []).push(x);
			return rv;
		}, {});
	}
}
