import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BriefingService } from '@appModule/state/briefing.service';
import { IMessageType } from '@interfaces/appConfig';
import { AppConfigService } from '@services/app-config.service';
import { IFormData } from './IFormData';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent {
	form: FormGroup;
	messageTypesCnf: IMessageType[];

	constructor(
		private formBuilder: FormBuilder, ////
		private appConfigService: AppConfigService,
		private briefingService: BriefingService
	) {
		this.messageTypesCnf = this.appConfigService.config.messageTypes;

		this.form = this.formBuilder.group({
			messageTypes: this.buildMessageTypes(),
			stations: ['LKPR EGLL'],
			countries: [undefined]
		});
	}

	get messageTypes(): FormArray {
		return this.form.get('messageTypes') as FormArray;
	}

	/**
	 * Build message types FormArray.
	 * @returns Form array of boolean controls.
	 */
	buildMessageTypes(): FormArray {
		const arr = this.messageTypesCnf.map((type) => this.formBuilder.group(type));
		return this.formBuilder.array(arr);
	}

	/**
	 * Form submit handler.
	 */
	onSubmit(): void {
		if (!this.form.valid) {
			this.form.markAllAsTouched();
			return;
		}

		this.briefingService.get(this.form.value as IFormData);
	}
}
