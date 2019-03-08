queryValidation = (query, selectionData) => {
  // console.log('hon', query, selectionData);

  function countryValid(country) {
    if (query.location_country && countries.indexOf(query.location_country.toUpperCase()) === -1) {
      return country;
    }
    return;
  }

  function cityValid(city) {
    if (query.location_city && cities.indexOf(query.location_city.toUpperCase()) === -1) {
      return city;
    }
    return;
  }

  function roomsValid(room) {
    if (query.size_rooms && rooms.indexOf(query.size_rooms) === -1) {
      return room;
    }
  }

  function v(query) {
    var valid = {};

    if (query && query.location_country && countryValid(query.location_country)) {
      valid.location_country = countryValid(query.location_country);
    }

    if (query && query.location_city && cityValid(query.location_city)) {
      valid.location_city = cityValid(query.location_city);
    }
    if (query && query.size_rooms && roomsValid(query.size_rooms)) {
      valid.size_rooms = roomsValid(query.size_rooms);
    }
    return valid;
  }
  // console.log(query);
  // console.log('hi', v(query));
};
module.exports = { queryValidation };
