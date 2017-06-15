import { Component } from '@angular/core';
import { MapPage, ListPage } from '../'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  viewMap() {
    this.navCtrl.push(MapPage);
  }

  viewList() {
    this.navCtrl.push(ListPage);
  }

}
