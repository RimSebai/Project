export default class AppService {
  static getHouses() {
    return fetch('http://localhost:3001/api/houses').then(response =>
      this.checkStatusCode(response),
    );
  }
  static getSearchedHouses(query) {
    return fetch(`http://localhost:3001/api/houses?${query}`).then(response =>
      this.checkStatusCode(response),
    );
  }
  static getCountries() {
    return fetch('http://localhost:3001/api/houses/filter').then(response =>
      this.checkStatusCode(response),
    );
  }
  static getHouseDetails(id) {
    return fetch(`http://localhost:3001/api/houses/${id}`).then(response =>
      this.checkStatusCode(response),
    );
  }
  static addHouse(data) {
    return fetch('http://localhost:3001/api/contribution', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    }).then(response => this.checkStatusCode(response));
  }

  static checkStatusCode(response) {
    if (response.status < 400) {
      return response.json();
    } else {
      throw response;
    }
  }
}
