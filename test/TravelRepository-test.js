import TravelRepository from '../src/TravelRepository'
import chai from 'chai';
import allData from './test-data'
const expect = chai.expect;

describe('Travel Repository', () => {

  let travelRepository

  beforeEach(function() {

    travelRepository = new TravelRepository(allData);

  });


  it('should be a function', function () {
  expect(TravelRepository).to.be.a('function');
  });

  it('should instantiate a Travel Repository', function () {
    expect(travelRepository).to.be.an.instanceof(TravelRepository);
  });

  it('should keep track of a collection of all traveler data', function () {
    expect(travelRepository.travelers).to.eql(allData.allTravelerData);
  });

  it('should keep track of a collection of all trip data', function () {
    expect(travelRepository.trips).to.eql(allData.allTripsData);
  });

  it('should keep track of a collection of all destination data', function () {
    expect(travelRepository.destinations).to.eql(allData.allDestinationData);
  });

  it.skip('should keep track of the current user', function () {
    travelRepository.createNewTraveler(1);
    expect(travelRepository.currentUser.name).to.eql(allData.allTravelerData[0].name);
    expect(travelRepository.currentUser).to.eql(allData.allTravelerData[0]);
  });

  it.skip('should instantiate a new user based on the current user', function() {
  expect(travelRepository.createNewTraveler(1)).to.be.an.instanceof(Traveler);
  });

});
