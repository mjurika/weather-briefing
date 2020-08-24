import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NoopAnimationsModule, environment.production ? [] : AkitaNgDevtools.forRoot(), HttpClientModule, TranslocoRootModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
