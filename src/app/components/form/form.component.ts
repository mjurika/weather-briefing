import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
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
			spatial: this.formBuilder.group(
				{
					stations: ['LKPR EGLL'],
					countries: [undefined]
				},
				{ validators: [this.requiredOneOfGroup] }
			)
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
	 */
	private requiredOneOfGroup(control: FormGroup): ValidationErrors | undefined {
		let anyValue = false;

		Object.keys(control.controls).forEach((key) => {
			if (!control.controls[key].value?.trim()) {
				return;
			}
			anyValue = true;
			return false;
		});

		return anyValue ? undefined : { requiredOneOfGroup: true };
	}

	/**
	 * Check if at least one formgroup of array has been selected.
	 * @param control FormGroup of controls.
	 */
	private selectedOneOfArray(control: FormArray): ValidationErrors | undefined {
		return control.controls.some((c) => c.value.selected) ? undefined : { selectedOneOfArray: true };
	}
}
