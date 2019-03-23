const validator = require('validator');
const NodeGeocoder = require('node-geocoder');
const moment = require('moment');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'GTCdnMSP8PHJ5hTTDpECDLdtTDQraxfi',
  formatter: null,
};

const geocoder = NodeGeocoder(options);

async function normalizeHouse(house) {
  const normalizedHouseObj = { ...house };
  if (!house.market_date) {
    normalizedHouseObj.market_date = moment().format('YYYY-MM-DD');
  }
  if (!house.images) {
    house.images = 'http://www.transparentpng.com/thumb/house/house-vector-5.png';
  }
  if (
    house.location_address &&
    !(house.location_coordinates_lat && house.location_coordinates_lng)
  ) {
    await geocoder
      .geocode(house.location_address)
      .then(function(res) {
        normalizedHouseObj.location_coordinates_lat = res[0].latitude;
        normalizedHouseObj.location_coordinates_lng = res[0].longitude;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  if (house.location_coordinates_lat && house.location_coordinates_lng && !house.location_address) {
    await geocoder
      .reverse({ lat: house.location_coordinates_lat, lon: house.location_coordinates_lng })
      .then(function(res) {
        house.location_address = res[0].streetName;
      })
      .catch(function(err) {
        console.log(err);
      });

    if ([0, 1].indexOf(house.sold) === -1) {
      errors.push('sold should be 1 or 0 ,so we will assume that it is still available house');
      normalizedHouseObj.sold = 0;
    }
  }
  return normalizedHouseObj;
}

function validateHouse(house) {
  const errors = [];
  if (typeof house !== 'object' || house.length === 0) {
    return errors.push(`you insert has to be Object and not empty`);
  } else {
    if (!house.link) {
      errors.push('Link is required field');
    } else if (!validator.isURL(house.link)) {
      errors.push(`${house.link} is not Valid Link`);
    }
    if (house.market_date !== moment(house.market_date).format('YYYY-MM-DD')) {
      errors.push('the date should be formated as YYYY-MM-DD');
    }
    const today = new Date();
    if (market_date && moment(market_date).isAfter(today)) {
      error.push('The date should be before today');
    } else if (!moment(market_date, 'YYYY-MM-DD').isValid()) {
      errors.push('The date is invalid');
    } else if (moment(market_date, 'YYYY-MM-DD').isAfter(today)) {
      errors.push('The date should be before today');
    }
    if (!house.location_country) {
      errors.push('Country Name is required field');
    } else if (typeof house.location_country !== 'string' || house.location_country.length <= 2) {
      errors.push(`${house.location_country} is not Valid Country name`);
    }
    if (!house.location_city) {
      errors.push('City Name is required field');
    } else if (typeof house.location_city !== 'string' || house.location_city.length <= 2) {
      errors.push(`${house.location_city} is not Valid City name`);
    }
    if (!house.size_living_area) {
      errors.push('size of living area is required');
    } else if (!isFinite(house.size_living_area)) {
      errors.push('size living area should be a number');
    }
    if (!house.size_rooms) {
      errors.push('number of rooms is required');
    } else if (typeof house.size_rooms !== 'number' && house.size_rooms <= 0) {
      errors.push('number of rooms should be valid number');
    }
    if (!house.price_value) {
      errors.push('Price is required field');
    } else if (house.price_value <= 0 || !isFinite(house.price_value)) {
      errors.push(`${house.price_value} is not Valid Price`);
    }
    if (!house.price_currency) {
      errors.push('Currency is required field');
    } else if (
      ['EUR', 'USD', 'JPY', 'GBP'].indexOf(String(house.price_currency).toUpperCase()) === -1
    ) {
      errors.push('Currency should be one of this (EUR,USD,JPY,GBP)');
    }
    if (house.images) {
      let URLs = house.images.split(',');
      let imagesErrors = '';
      let arr = [];
      URLs.map(URL => {
        if (validator.isURL(URL)) {
          arr.push(URL);
        } else {
          imagesErrors += `this ${URL}is not valid URL`;
        }
      });
      imagesErrors && errors.push(imagesErrors);
    }
  }
  return errors;
}

function validateHouses(houseObjects) {
  const validData = [];
  const invalidData = [];
  houseObjects.forEach(houseObj => {
    const normalizedHouseObj = normalizeHouse(houseObj);
    const errors = validateHouse(normalizedHouseObj);
    if (errors.length === 0) {
      validData.push(normalizedHouseObj);
    } else {
      invalidData.push({
        errors,
        raw: houseObj,
      });
    }
  });

  return {
    validData,
    invalidData,
  };
}

module.exports = { validateHouses };
