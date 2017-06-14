export class Position {
    constructor(coordinates:Coordinates){
        this.Lattitude = coordinates.latitude;
        this.Longitude = coordinates.longitude;
    }
    Lattitude: number;
    Longitude: number;
}