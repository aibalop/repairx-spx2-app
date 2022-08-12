import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { HeaderInterceptorService } from './lib/core/services/header-interceptor.service';
import { UnauthorizedInterceptorService } from './lib/core/services/unauthorized-interceptor.service';
import { SharedModule } from './lib/shared/shared.module';

registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
