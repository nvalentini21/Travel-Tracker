import TravelRepository from '../src/TravelRepository'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'
import Destination from '../src/Destination'
import chai from 'chai';
import allData from './test-data'
const expect = chai.expect;

describe('Trip', () => {

  let travelRepository, traveler, trip

  beforeEach(function() {

    travelRepository = new TravelRepository(allData)
    traveler = new Traveler(allData.travelerData, allData.travelerTripsData);
    trip = new Trip(allData.travelerTripsData[0])

  });


  it('should be a function', function () {
  expect(Trip).to.be.a('function');
  });

  it('should instantiate a Trip', function () {
    console.log(trip)
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should keep track of the trip ID', function () {
    expect(trip.id).to.eql(allData.travelerTripsData[0].id);
  });

  it('should keep track of the travelerID', function () {
    expect(trip.userID).to.eql(allData.travelerTripsData[0].userID);
  });

  it('should keep track of the number of travelers', function () {
    expect(trip.travelers).to.eql(allData.travelerTripsData[0].travelers);
  });

  it('should keep track of the number of travelers', function () {
    expect(trip.travelers).to.eql(allData.travelerTripsData[0].travelers);
  });

  it('should keep track of the booking date', function () {
    expect(trip.date).to.eql(allData.travelerTripsData[0].date);
  });

  it('should keep track of the trip duration', function () {
    expect(trip.duration).to.eql(allData.travelerTripsData[0].duration);
    console.log(trip)
  });

  it('should keep track of the trip status', function () {
    expect(trip.status).to.eql(allData.travelerTripsData[0].status)
  });

  it('should keep track of suggested activities to be added later', function () {
    expect(trip.suggestedActivities).to.eql([]);
  });

  it('should be able to instantiate a Destination and keep track of destination data', function () {
    trip.instantiateDestination(travelRepository)
    expect(trip.destinationData).to.be.an.instanceof(Destination);
    expect(trip.destinationData.id).to.eql(50)
  });

  it('should be able to calculate the total cost of a one way flight', function () {
    trip.instantiateDestination(travelRepository)
    expect(trip.calcTotalFlightCost()).to.eql(450)
  });

  it('should be able to calculate the total cost of a round trip flight', function () {
    trip.instantiateDestination(travelRepository)
    expect(trip.calcRoundTripCost()).to.eql(900)
  });
});
