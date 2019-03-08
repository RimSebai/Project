import React from 'react';
import { withRouter } from 'react-router';
import service from '../service/service';

class Filter extends React.Component {
  state = {
    countries: [],
    cities: [],
    NumberOfRooms: [],
    searchCriteria: {
      country: '',
      city: '',
      price_min: 0,
      price_max: 1000000,
      rooms: 1,
      order: 'location_country_asc',
      page: 1
    }
  };
  componentDidMount() {
    service.getCountries().then(res => {
      this.setState({
        countries: res.countries,
        cities: res.cities,
        NumberOfRooms: res.rooms
      });
    });
  }
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      searchCriteria: {
        ...this.state.searchCriteria,
        [name]: value
      }
    });
  };
  handleSubmit = e => {
    let filterKeys = Object.keys(this.state.searchCriteria);
    let URLQuery = filterKeys
      .reduce((query, key) => {
        this.state.searchCriteria[key] !== '' &&
          query.push(`${key}=${encodeURI(this.state.searchCriteria[key])}`);
        return query;
      }, [])
      .join('&');
    service.getHousesWithQuery(URLQuery).then(res => {});
  };

  render() {
    const minPrice = [50000, 75000, 100000, 125000, 150000, 175000, 200000];
    const maxPrice = [50000, 75000, 100000, 125000, 150000, 175000, 200000];
    const orders = ['location_country_dsc', 'price_asc', 'price_dsc'];
    let style = {
      backgroundColor:
        this.state.searchCriteria.price_min > this.state.searchCriteria.price_max
          ? 'orange'
          : 'white'
    };
    return (
      <form className="filter-form" onSubmit={this.handleSubmit}>
        <br />
        <label>Country</label>
        <select onChange={this.handleChange} name="country">
          <option values={this.state.searchCriteria.country} />
          {this.state.countries.map((country, key) => (
            <option key={key} values={country}>
              {country}
            </option>
          ))}
        </select>
        <br />
        <label>City</label>
        <select onChange={this.handleChange} name="city">
          <option values={this.state.searchCriteria.city} />
          {this.state.cities.map((city, key) => (
            <option key={key} values={city}>
              {city}
            </option>
          ))}
        </select>
        <br />
        <label>Min Price</label>
        <select onChange={this.handleChange} name="price_min">
          <option value={this.state.searchCriteria.price_min}>
            {this.state.searchCriteria.price_min}
          </option>
          {minPrice.map((price, key) => (
            <option key={key} values={price}>
              {price}
            </option>
          ))}
        </select>
        <br />
        <label>Max Price</label>
        <select style={style} onChange={this.handleChange} name="price_max">
          <option value={this.state.searchCriteria.price_max}>
            {this.state.searchCriteria.price_max}
          </option>
          {maxPrice.map((price, key) => (
            <option key={key} values={price}>
              {price}
            </option>
          ))}
        </select>
        <br />
        <label>Number of rooms</label>
        <select onChange={this.handleChange} name="rooms">
          <option value={this.state.searchCriteria.rooms}>1</option>
          {this.state.NumberOfRooms.map((room, key) => (
            <option key={key} values={room}>
              {room}
            </option>
          ))}
        </select>
        <label>Ordered by</label>
        <select onChange={this.handleChange} name="order">
          <option value={this.state.searchCriteria.order}>{this.state.searchCriteria.order}</option>
          {orders.map((order, key) => (
            <option key={key} values={order}>
              {order}
            </option>
          ))}
        </select>
        <br />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default withRouter(Filter);
