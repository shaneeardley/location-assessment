import { Component, ViewChild, ElementRef } from '@angular/core';
import { DistanceType } from '../../enums/distance-type';
import { Storage } from '@ionic/storage';
import { Position } from '../../classes/position';
import * as loc from '../../classes/location';
import { LocationService } from '../../services/location.service';
import { AlertController } from 'ionic-angular';

declare var google: any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  distanceType: DistanceType;
  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(private storage: Storage, private LocationService: LocationService, public alertCtrl: AlertController) { }

  currentPosition: Position;

  ionViewDidLoad() {
    this.distanceType = DistanceType.Km;
    this.storage.get('currentPosition').then((currentPosition: Position) => {
      this.currentPosition = currentPosition;
      this.storage.get('itemLocations').then((itemLocations: Location[]) => {
        this.loadMap(itemLocations);
      });
    });

  }

  loadMap(mapData: any) {
    let mapEle = this.mapElement.nativeElement;
    var latlng = new google.maps.LatLng(this.currentPosition.Lattitude, this.currentPosition.Longitude);
    let map = new google.maps.Map(mapEle, {
      center: latlng,
      zoom: 16
    });

    //Add current location markers
    mapData.forEach((markerData: loc.Location) => {

      debugger
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerData.Lattitude, markerData.Longitude),
        map: map,
        title: markerData.name,
        icon: `assets/icon/dumbell.png`
      });


      marker.addListener('click', () => {

        let extraContent: string;
        if (this.distanceType == DistanceType.Km)
          extraContent = `<div *ngIf="distanceType == 0">${markerData.KilometersAway} kilometers away </div>`
        else if (this.distanceType == DistanceType.Mi)
          extraContent = `<div *ngIf="distanceType == 1">${markerData.MilesAway} miles away </div>`
        else
          extraContent = `<div *ngIf="distanceType == 2">${markerData.MetersAway} meters away </div>`
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>Name: <b>${markerData.name}</b>  </h5><br/>
        <h6>Rating: <b>${markerData.rating}</b></h6>
        </b> 
        ${extraContent}`
        });
        infoWindow.open(map, marker);
      });
    });

    let myInfo = new google.maps.InfoWindow({
      content: `<h5>You are  here</h5>`
    });
    let myMarker = new google.maps.Marker({
      position: new google.maps.LatLng(this.currentPosition.Lattitude, this.currentPosition.Longitude),
      map: map,
      title: 'Your Locations',
      icon: `assets/icon/pin.png`
    });
    myMarker.addListener('click', () => {
      myInfo.open(map, myMarker);
    });

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
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