import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NoopAnimationsModule, environment.production ? [] : AkitaNgDevtools.forRoot()],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
