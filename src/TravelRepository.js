import Traveler from './Traveler'

class TravelerRepository {
  constructor(data){
    this.travelers = data.travelers;
    this.currentTraveler = '';
    this.trips = data.trips;
    this.destinations = data.destinations;
  }
}
