import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeSk from '@angular/common/locales/sk';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppConfigService } from '@services/app-config.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BriefingComponent } from './components/briefing/briefing.component';
import { FormComponent } from './components/form/form.component';
import { MaterialModule } from './material.module';
import { TranslocoRootModule } from './transloco-root.module';

/**
 * Register locale for datePipe.
 */
registerLocaleData(localeSk);

/**
 * Initialize app config.
 * @param appConfigService App config service.
 */
const appInitializerFn = (appConfigService: AppConfigService) => {
	return () => {
		return appConfigService.loadAppConfig();
	};
};

@NgModule({
	declarations: [AppComponent, FormComponent, BriefingComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		HttpClientModule,
		TranslocoRootModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	providers: [
		AppConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFn,
			multi: true,
			deps: [AppConfigService]
		},
		{ provide: LOCALE_ID, useValue: 'sk' }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
