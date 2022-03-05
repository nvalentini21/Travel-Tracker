import Traveler from './Traveler'

class TravelRepository {
  constructor(data){
    this.travelers = data.allTravelerData;
    this.currentTraveler = '';
    this.trips = data.allTripData;
    this.destinations = data.allDestinationData;
  }

   createNewTraveler(id) {
     const travelerData = this.travelers.find(traveler => traveler.id === id)
     const tripsData = this.trips.filter(trip => trip.userID === id)
     const newTraveler = new Traveler(travelerData)
     this.currentTraveler = newTraveler;
     console.log(this.currentTraveler)
   }
}

export default TravelRepository;
