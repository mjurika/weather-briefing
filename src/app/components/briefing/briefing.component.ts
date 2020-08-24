import { Component, OnInit } from '@angular/core';
import { BriefingQuery } from '@appModule/state/briefing.query';
import { IReport } from '@appModule/state/briefing.store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-briefing',
	templateUrl: './briefing.component.html',
	styleUrls: ['./briefing.component.scss']
})
export class BriefingComponent implements OnInit {
	loading$: Observable<boolean>;
	error$: Observable<boolean>;
	reports: IReport[];

	constructor(private briefingQuery: BriefingQuery) {
		this.loading$ = this.briefingQuery.selectLoading();
		this.error$ = this.briefingQuery.selectError();
		this.briefingQuery.select().subscribe((state) => {
			this.reports = state.reports;
			debugger;
		});
	}

	ngOnInit(): void {}
}
