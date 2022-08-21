import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';

// third party
import { L10nConfig, L10nLoader, TranslationModule, StorageStrategy, ProviderType } from 'angular-l10n';

// our primary application routes
import { routing, appRoutingProviders } from './app-routes/app.routes';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HdrNavComponent } from './common/support/hdr-nav/hdr-nav.component';
import { LayoutModule } from '@angular/cdk/layout';


import {    MatToolbarModule, 
            MatButtonModule, 
            MatSidenavModule, 
            MatIconModule, 
            MatListModule,
            MatProgressSpinnerModule,
            MatFormFieldModule,
            MatDialogModule } from '@angular/material';

// working windows
import { PageComponent } from './features/primary/page/page.component';
import { AlertDialogComponent } from './common/dialog/alert-dialog/alert-dialog.component';
import { GlobalsService } from './app-services/globals.service';




const l10nConfig: L10nConfig = {
    locale: {
        languages: [
            { code: 'en', dir: 'ltr' }
        ],
        language: 'en',
        storage: StorageStrategy.Cookie
    },
    translation: {
        providers: [
            { type: ProviderType.Static, prefix: './assets/locale/locale-' },
        ],
        caching: true//,
        //missingValue: (path: string) => {return (path);  }
    }
};

@NgModule({
  declarations: [
    AppComponent,
    HdrNavComponent,
    PageComponent,
    AlertDialogComponent,
  ],
  entryComponents: [
        AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    TranslationModule.forRoot(l10nConfig),
    RouterModule,
    routing
  ],
  providers: [
    TranslationModule,
    appRoutingProviders,
    GlobalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public translateLoader: L10nLoader) {
        this.translateLoader.load();
    }
 }
