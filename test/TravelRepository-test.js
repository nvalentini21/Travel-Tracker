import TravelRepository from '..src/TravelRepository'
import chai from 'chai';
const expect = chai.expect;

describe('User Repository', () => {

  let userRepository, allData;

  beforeEach(function() {

    allData = {
      allTravelerData: [],
      allTripData: [],
      allDestinationData: [],
    };

    userRepository = new TravelRepository(allData);

  });
