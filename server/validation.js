// const validation = require('validation');

validator = (houses, invalidDataMessages = [], validData = []) => {
  houses.map(house => {
    let validHouse = [];
    let invalidHouse = [];
    if (Object.keys(house).length === 0 || !house.constructor === Object) {
      invalidDataMessages.push([`you inserted has to be Object and not empty`]);
    } else {
      if (!house.link) {
        invalidHouse.push('Link is required field');
      } else if (!validURL(house.link)) {
        invalidHouse.push(`${house.link} is not Valid Link`);
      } else {
        validHouse.push(house.link);
      }
      if (!house.location_country) {
        invalidHouse.push('Country Name is required field');
      } else if (typeof house.location_country !== 'string') {
        invalidHouse.push(`${house.location_country} is not Valid Country name`);
      } else {
        validHouse.push(house.location_country);
      }
      if (!house.location_city) {
        invalidHouse.push('City Name is required field');
      } else if (typeof house.location_city !== 'string') {
        invalidHouse.push(`${house.location_city} is not Valid City name`);
      } else {
        validHouse.push(house.location_city);
      }
      if (
        !(house.location_coordinates_lat && house.location_coordinates_lng) &&
        !house.location_address
      ) {
        invalidHouse.push('You have to insert either address or ING and LAT');
      } else {
        if (house.location_address) {
          validHouse.push(String(house.location_address));
        } else {
          validHouse.push('');
        }
        if (typeof house.location_coordinates_lat === 'number') {
          validHouse.push(house.location_coordinates_lat);
        } else if (typeof house.location_coordinates_lat === 'undefined') {
          validHouse.push(0);
        } else {
          invalidHouse.push('lat should be a number');
        }
        if (typeof house.location_coordinates_lng === 'number') {
          validHouse.push(house.location_coordinates_lng);
        } else if (typeof house.location_coordinates_lng === 'undefined') {
          validHouse.push(0);
        } else {
          invalidHouse.push('lng should be a number');
        }
      }
      if (!house.size_living_area) {
        validHouse.push(0);
      } else if (isFinite(house.size_living_area)) {
        validHouse.push(house.size_living_area);
      } else {
        invalidHouse.push('size should be a number');
      }
      if (!house.size_rooms) {
        invalidHouse.push('number of rooms is required');
      } else if (typeof house.size_rooms === 'number' && house.size_rooms > 0) {
        validHouse.push(house.size_rooms);
      } else {
        invalidHouse.push('number of rooms should be valid number');
      }
      if (!house.price_value) {
        invalidHouse.push('Price is required field');
      } else if (house.price_value <= 0 || !isFinite(house.price_value)) {
        invalidHouse.push(`${house.price_value} is not Valid Price`);
      } else {
        validHouse.push(house.price_value);
      }
      if (!house.price_currency) {
        invalidHouse.push('Currency is required field');
      } else if (
        ['EUR', 'USD', 'JPY', 'GBP'].indexOf(String(house.price_currency).toUpperCase()) === -1
      ) {
        invalidHouse.push('Currency should be one of this (EURO,USD,JPY,GBP)');
      } else {
        validHouse.push(house.price_currency);
      }
      if (!house.description) {
        validHouse.push('');
      } else {
        validHouse.push(house.description + '');
      }
      if (!house.title) {
        validHouse.push('');
      } else {
        validHouse.push(house.title + '');
      }
      if (!house.images) {
        validHouse.push('');
      } else {
        let URLs = house.images.split(',');
        let imagesErrors = '';
        URLs.map(URL => !validURL(URL) && (imagesErrors += `this ${URL}is not valid URL`));
        imagesErrors ? invalidHouse.push(imagesErrors) : validHouse.push(house.images);
      }
      if (!house.sold) {
        validHouse.push(0);
      } else if (house.sold === 1 || house.sold === 0) {
        validHouse.push(house.sold);
      } else {
        invalidHouse.push('sold should be 1 or 0');
      }
      invalidDataMessages.push(invalidHouse);
      validData.push(validHouse);
    }
  });

  return { validData, invalidDataMessages };
};

function validURL(myURL) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&amp;a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return pattern.test(myURL);
}

module.exports = { validator };
