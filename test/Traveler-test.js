import TravelRepository from '../src/TravelRepository'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'
import Destination from '../src/Destination'
import chai from 'chai';
import allData from './test-data'
const expect = chai.expect;

describe('Traveler', () => {

  let travelRepository, traveler, trip

  beforeEach(function() {

    travelRepository = new TravelRepository(allData)
    traveler = new Traveler(allData.travelerData, allData.travelerTripsData);


  });


  it('should be a function', function () {
  expect(Traveler).to.be.a('function');
  });

  it('should instantiate a Travel Repository', function () {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should keep track of a travelers ID', function () {
    expect(traveler.id).to.eql(allData.travelerData.id);
  });

  it('should keep track of a travelers name', function () {
    expect(traveler.name).to.eql(allData.travelerData.name);
  });

  it('should keep track of the traveler type', function () {
    expect(traveler.travelerType).to.eql(allData.travelerData.travelerType);
  });

  it('should keep track of all of the traveler\'s trips', function () {
    expect(traveler.allTrips).to.eql(allData.travelerTripsData);
  });

  it('should keep track of all of the traveler\'s past trips', function () {
    expect(traveler.pastTrips).to.eql([]);
    traveler.sortTripsPast()
    expect(traveler.pastTrips.length).to.eql(5)
  });

  it('should keep track of all of the traveler\'s present trips', function () {
    expect(traveler.pastTrips).to.eql([]);
    traveler.sortTripsPresent()
    expect(traveler.presentTrips.length).to.eql(0)
  });

  it('should keep track of all of the traveler\'s present trips', function () {
    expect(traveler.pastTrips).to.eql([]);
    traveler.sortTripsPresent()
    expect(traveler.presentTrips.length).to.eql(0)
  });

  it('should keep track of all of the traveler\'s future trips', function () {
    expect(traveler.futureTrips).to.eql([]);
    traveler.sortTripsFuture()
    expect(traveler.futureTrips.length).to.eql(1)
  });

  it('should keep track of all of the traveler\'s pending trips', function () {
    expect(traveler.pendingTrips).to.eql([]);
    traveler.sortTripsFuture()
    expect(traveler.pendingTrips.length).to.eql(0)
  });

  // it.skip('should be able to instantiate Trips from the trips data', function () {
  //   traveler.instantiateTrips(traveler.allTrips)
  //   console.log(traveler.allTrips)
  //   expect(traveler.allTrips).to.eql(tripInstantiations);
  // });
  //
  // it.skip('should be able to calculate the cost of the trip with a 10% fee', function () {
  //   traveler.instantiateTrips(traveler.allTrips)
  //   expect(traveler.calculateAnnualTotal()).to.eql();
  // })
})
