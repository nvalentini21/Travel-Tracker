import Traveler from './Traveler'

class TravelRepository {
  constructor(data){
    this.travelers = data.allTravelerData;
    this.currentTraveler = '';
    this.trips = data.allTripsData;
    this.destinations = data.allDestinationData;
  }

   createNewTraveler(id) {
     const travelerData = this.travelers.find(traveler => traveler.id === id)
     const tripsData = this.trips.filter(trip => trip.userID === id)
     const newTraveler = new Traveler(travelerData, tripsData)
     this.currentTraveler = newTraveler;
   }
}

export default TravelRepository;
