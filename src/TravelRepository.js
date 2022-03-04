import Traveler from './Traveler'

class TravelRepository {
  constructor(data){
    this.travelers = data.travelerData;
    this.currentTraveler = '';
    this.trips = data.tripsData;
    this.destinations = data.destinationData;
  }
}

export default TravelRepository;
