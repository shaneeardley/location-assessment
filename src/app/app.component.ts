import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as geo from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Http } from "@angular/http";
import { TabsPage } from '../pages/tabs/tabs';
import { Location } from '../classes/location';
import { Position } from '../classes/position';
import 'rxjs/Rx';
import { LocationService } from '../services/location.service'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(public platform: Platform, private geolocation: geo.Geolocation, public statusBar: StatusBar, public alertCtrl: AlertController,
    public splashScreen: SplashScreen, public storage: Storage, private http: Http, private LocationService: LocationService) {
    //Get and save current location
    this.geolocation.getCurrentPosition().then((position) => {
      let myPosition = new Position(position.coords)
      this.storage.set('currentPosition', myPosition);
      this.http.get('assets/locations.json').map(res => { return res.json() }).subscribe((res: Location[]) => {
        res.forEach(r => {
          r.Lattitude = Number(r.latlong.split(',')[0].trim());
          r.Longitude = Number(r.latlong.split(',')[1].trim());
          r.KilometersAway = this.LocationService.getKMDistance(myPosition, r);
          r.MetersAway = this.LocationService.GetDistanceBetween(myPosition, r);
          r.MilesAway = this.LocationService.getMileDistance(myPosition, r);
        });
        this.storage.set('itemLocations', res);
        this.initializeApp();
      });
    }, (err) => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Location Required!',
        subTitle: 'The Location Application will not function properly without your location...',
        buttons: [
          {
            text: 'OK'

          }
        ]
      });
      alert.present();
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //ToDo - load our location here, then go to 'home'
    });
  }
}
