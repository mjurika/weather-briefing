import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldDefaultOptions, MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const formFieldDefaults: MatFormFieldDefaultOptions = {
	appearance: 'outline'
};

@NgModule({
	declarations: [],
	imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule],
	exports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule],
	providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: formFieldDefaults }]
})
export class MaterialModule {}
