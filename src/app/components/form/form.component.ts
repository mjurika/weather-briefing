import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IMessageType } from '../../interfaces/appConfig';
import { AppConfigService } from '../../services/app-config.service';
import { BriefingService } from '../../state/briefing.service';
import { IFormData } from './IFormData';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent {
	form: FormGroup;
	messageTypesCnf: IMessageType[];

	private airportsRegex: RegExp;
	private countriesRegex: RegExp;

	constructor(
		private formBuilder: FormBuilder, ////
		private appConfigService: AppConfigService,
		private briefingService: BriefingService
	) {
		this.messageTypesCnf = this.appConfigService.config.messageTypes;
		this.airportsRegex = new RegExp(/^([A-Z]{4})(?: ([A-Z]{4}))*$/);
		this.countriesRegex = new RegExp(/^([A-Z]{2})(?: ([A-Z]{2}))*$/);

		this.form = this.formBuilder.group({
			messageTypes: this.buildMessageTypes(),
			spatial: this.formBuilder.group(
				{
					airports: [undefined, Validators.pattern(this.airportsRegex)],
					countries: [undefined, Validators.pattern(this.countriesRegex)]
				},
				{ validators: [this.requiredOneOfGroup] }
			)
		});
	}

	get messageTypes(): FormArray {
		return this.form.get('messageTypes') as FormArray;
	}

	get spatial(): FormGroup {
		return this.form.get('spatial') as FormGroup;
	}

	get airports(): FormGroup {
		return this.spatial.get('spatiairportsal') as FormGroup;
	}

	get countries(): FormGroup {
		return this.spatial.get('countries') as FormGroup;
	}

	/**
	 * Build message types FormArray.
	 * @returns Form array of boolean controls.
	 */
	buildMessageTypes(): FormArray {
		const arr = this.messageTypesCnf.map((type) => this.formBuilder.group(type));
		return this.formBuilder.array(arr, { validators: this.selectedOneOfArray });
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

	/**
	 * Check if at least one control of group has any non empty value.
	 * @param control FormGroup of controls.
	 * @returns Validation error - requiredOneOfGroup.
	 */
	private requiredOneOfGroup(control: FormGroup): ValidationErrors | undefined {
		let anyValue = false;

		Object.keys(control.controls).forEach((key) => {
			const val = control.controls[key].value;
			if (!val || !val.trim()) {
				return;
			}
			anyValue = true;
			return false;
		});

		return anyValue ? undefined : { requiredOneOfGroup: true };
	}

	/**
	 * Check if at least one checkbox in formgroup of array has been selected.
	 * @param control FormGroup of controls.
	 * @returns Validation error - selectedOneOfArray.
	 */
	private selectedOneOfArray(control: FormArray): ValidationErrors | undefined {
		return control.controls.some((c) => c.value.selected) ? undefined : { selectedOneOfArray: true };
	}
}
