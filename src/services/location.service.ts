import { Injectable } from '@angular/core'
import { Location } from '../classes/location'
import { Position } from '../classes/position';

declare var google: any;
@Injectable()
export class LocationService {
    GetDistanceBetween(myPosition: Position, selLocation: Location) {
        let from = new google.maps.LatLng(myPosition.Lattitude, myPosition.Longitude);
        let to = new google.maps.LatLng(selLocation.Lattitude, selLocation.Longitude);
        let dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
        return dist;
    }
    getKMDistance(myPosition: Position, selLocation: Location) {
        return this.GetDistanceBetween(myPosition, selLocation) / 1000;
    }
    getMileDistance(myPosition: Position, selLocation: Location) {
        return this.GetDistanceBetween(myPosition, selLocation) / 1609;
    }
}
