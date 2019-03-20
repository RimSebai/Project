const defaultVal = query => {
  if (!query.country) {
    query.country = '';
  }
  if (!query.city) {
    query.city = '';
  }
  if (!query.price_min) {
    query.price_min = 0;
  }
  if (!query.price_max) {
    query.price_max = 1000000;
  }
  if (!query.rooms) {
    query.rooms = 1;
  }
  if (!query.order) {
    query.order = 'location_country_asc';
  }
  if (!query.page) {
    query.page = 1;
  }
  return query;
};

const queryValidation = query => {
  query = defaultVal(query);
  errorMessages = [];
  if (isNaN(Number(query.price_max))) {
    errorMessages.push('Price max should be a number');
  }
  if (isNaN(Number(query.price_min))) {
    errorMessages.push('Price min should be a number');
  }
  if (!isNaN(Number(query.price_max)) && !isNaN(Number(query.price_min))) {
    query.price_max = Number(query.price_max);
    query.price_min = Number(query.price_min);
    if (query.price_max < query.price_min) {
      errorMessages.push('maximum price should be higher than minimum price');
    }
    if (query.price_max < 0 || query.price_min < 0) {
      errorMessages.push('price should be more than zero');
    }
  }

  if (isNaN(Number(query.rooms))) {
    errorMessages.push('number of rooms should be number');
  } else if (Number(query.rooms) < 1) {
    errorMessages.push('number of rooms should be more than 1');
  } else {
    query.rooms = Number(query.rooms);
  }

  if (isNaN(Number(query.page))) {
    errorMessages.push('Page should be number');
  } else if (Number(query.page) < 1) {
    errorMessages.push('page should be more than 1');
  } else {
    query.page = Number(query.page);
  }

  if (
    [
      'location_country_asc',
      'location_country_desc',
      'price_value_asc',
      'price_value_desc',
    ].indexOf(query.order) === -1
  ) {
    query.order = 'location_country_asc';
  }
  if (errorMessages.length >= 1) {
    return [false, errorMessages];
  } else {
    return [true, query];
  }
};
module.exports = { queryValidation };
