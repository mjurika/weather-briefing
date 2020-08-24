import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { TranslocoRootModule } from './transloco-root.module';
import { FormComponent } from './components/form/form.component';
import { BriefingComponent } from './components/briefing/briefing.component';

@NgModule({
	declarations: [AppComponent, FormComponent, BriefingComponent],
	imports: [
		BrowserModule,
		NoopAnimationsModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		HttpClientModule,
		TranslocoRootModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
