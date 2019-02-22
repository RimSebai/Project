export default class AppService {
  static getHouses() {
    return fetch('http://localhost:3001/api/houses').then(response =>
      this.checkStatusCode(response)
    );
  }
  static getHouseDetails(id) {
    return fetch(`http://localhost:3001/api/houses/${id}`).then(response =>
      this.checkStatusCode(response)
    );
  }

  static checkStatusCode(response) {
    if (response.status < 400) {
      return response.json();
    } else {
      throw response;
    }
  }
}
