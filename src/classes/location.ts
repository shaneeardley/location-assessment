import { Position } from './position';

export class Location {
    constructor(location: any) {
        this.name = location.name;
        this.rating = location.rating;
        this.latlong = location.latlong;
    }
    name: string;
    rating: number;
    latlong: string;
    Lattitude: number;
    Longitude: number;

    MetersAway:number;
    KilometersAway:number;
    MilesAway:number;


    

}