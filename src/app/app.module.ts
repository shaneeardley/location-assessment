import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import * as geo from '@ionic-native/geolocation';


import { HomePage,MapPage,ListPage,TabsPage } from '../pages';
import{GoogleMaps} from'@ionic-native/google-maps';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LocationService} from '../services/location.service';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ListPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ListPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocationService,
    geo.Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps
  ]
})
export class AppModule {}
