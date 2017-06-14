import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Position} from '../../classes/position';
import {Location} from '../../classes/location';
import { Storage } from '@ionic/storage';
import {DistanceType} from '../../enums/distance-type';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  locations: Location[];
  distanceType:DistanceType;

  constructor(public navCtrl: NavController, private storage:Storage) {

  }

  ionViewDidLoad() {
    this.distanceType = DistanceType.Km;
      this.storage.get('itemLocations').then((itemLocations: Location[]) => {
        this.locations = itemLocations
      });

  }

}
