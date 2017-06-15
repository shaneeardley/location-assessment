import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Position } from '../../classes/position';
import { Location } from '../../classes/location';
import { Storage } from '@ionic/storage';
import { DistanceType } from '../../enums/distance-type';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  locations: Location[];
  hideList: boolean;
  distanceType: DistanceType;
  private sortingRated: boolean;
  get SortingRated(): boolean {
    return this.sortingRated;
  }
  set SortingRated(value: boolean) {
    this.sortingRated = value;
    if (value)
      this.orderRated();
    else
      this.orderDistance();
  }


  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.distanceType = DistanceType.Km;
    this.storage.get('itemLocations').then((itemLocations: Location[]) => {
      this.locations = itemLocations;
      this.SortingRated = true;
    });

  }
  orderRated() {
    if (!this.locations) return;
    this.hideList = true;
    this.locations = this.locations.sort((a, b) => (a.rating == b.rating) ? 0 : ((a.rating > b.rating) ? -1 : 1));
    this.hideList = false;
  }

  orderDistance() {
    if (!this.locations) return;
    this.hideList = true;
    this.locations = this.locations.sort((a, b) => (a.KilometersAway == b.KilometersAway) ? 0 : ((a.KilometersAway < b.KilometersAway) ? -1 : 1));
    this.hideList = false;
  }

  setUnits() {
    let confirm = this.alertCtrl.create({
      title: 'Select distance units',
      message: 'Please select the unit of measurement you wish to use',
      buttons: [
        {
          text: 'Kilometers',
          handler: () => { this.distanceType = DistanceType.Km; }
        },
        {
          text: 'Miles',
          handler: () => { this.distanceType = DistanceType.Mi; }
        },
        {
          text: 'Meters',
          handler: () => { this.distanceType = DistanceType.m; }
        }
      ]
    });
    confirm.present();
  }

}
