import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'colorReport'
})
export class ColorReportPipe implements PipeTransform {
	private regex: RegExp;

	constructor() {
		this.regex = new RegExp(/(BKN|FEW|SCT)(\d{3})([\s\S]*)/);
	}

	/**
	 * Matches words starting with 'BKN', 'FEW' or 'SCT' strings, followed by number with 3 digits(for example 'BKN021', 'FEW015', 'SCT040').
	 * Such words has to be displayed with blue color if number they contains is lower or equals than 30 and with red color if number is greater than 30.
	 * @param value Text to color.
	 */
	transform(value: string): string {
		const values = value.split(' ').map((val) => {
			const r = this.regex.exec(val);
			if (!r) {
				return val;
			}
			return parseInt(r[2], 10) > 30 ? `<font color="red">${val}</font>` : `<font color="blue">${val}</font>`;
		});
		return values.join(' ');
	}
}
