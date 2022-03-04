import Traveler from './Traveler'

class TravelRepository {
  constructor(data){
    this.travelers = data.allTravelerData;
    this.currentTraveler = '';
    this.trips = data.allTripsData;
    this.destinations = data.allDestinationData;
  }
}

export default TravelRepository;
