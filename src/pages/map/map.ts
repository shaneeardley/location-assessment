import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import {Position} from '../../classes/position';
import * as loc from '../../classes/location';
import {LocationService} from '../../services/location.service';

declare var google: any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(  private storage: Storage, private LocationService:LocationService) { }

  currentPosition: Position;

  ionViewDidLoad() {
    this.storage.get('currentPosition').then((currentPosition: Position) => {
      this.currentPosition = currentPosition;
      this.storage.get('itemLocations').then((itemLocations: Location[])=>{        
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
      let infoWindow = new google.maps.InfoWindow({
        content: `<h5>Name: <b>${markerData.name}</b>  </h5><br/><h6>Rating: <b>${markerData.rating}</b></h6></b>${markerData.KilometersAway} km / ${markerData.MilesAway} mi away `
      });
      debugger
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng( markerData.Lattitude,markerData.Longitude),
        map: map,
        title: markerData.name,
        icon: `assets/icon/pin.png`
      });


      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });



    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

}