import React from 'react';
import { withRouter } from 'react-router';
import service from '../service/service';

class Filter extends React.Component {
  state = {
    houses: [],
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
      page: 1,
    },
  };
  componentDidMount() {
    service.getCountries().then(res => {
      this.setState({
        countries: res.countries,
        cities: res.cities,
        NumberOfRooms: res.rooms,
      });
    });

    const params = this.props.location.search
      .replace(/^\?/, '')
      .split('&')
      .filter(el => el.length)
      .map(pair => pair.split('='))
      .reduce((params, [name, value]) => {
        params[name] = value;
        return params;
      }, {});
    (() => {
      this.setState(
        {
          ...this.state,
          searchCriteria: {
            ...this.setState.searchCriteria,
            ...params,
          },
        },
        () =>
          service.getSearchedHouses(this.props.location.search.replace(/^\?/, '')).then(res => {
            // console.log(res);
            this.props.onReload(res);
          }),
      );
    })();
  }
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      searchCriteria: {
        ...this.state.searchCriteria,
        [name]: value,
      },
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchCriteria);
  };

  render() {
    const minPrice = [0, 5000, 10000, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000];
    const maxPrice = [50000, 75000, 100000, 125000, 150000, 175000, 200000, 1000000];
    const orders = ['location_country_desc', 'price_value_asc', 'price_value_desc'];
    const { price_min, price_max, city, country, order, rooms } = this.state.searchCriteria;
    let style = {
      backgroundColor: price_min > price_max ? 'orange' : 'white',
    };
    return (
      <form className="filter-form" onSubmit={this.handleSubmit}>
        <br />
        <label>Country</label>
        <select onChange={this.handleChange} value={country} name="country">
          <option values={country} />
          {this.state.countries.map((country, key) => (
            <option key={key} values={country}>
              {country}
            </option>
          ))}
        </select>
        <br />
        <label>City</label>
        <select onChange={this.handleChange} values={city} name="city">
          <option values={city} />
          {this.state.cities.map((city, key) => (
            <option key={key} values={city}>
              {city}
            </option>
          ))}
        </select>
        <br />
        <label>Min Price</label>
        <select onChange={this.handleChange} value={price_min} name="price_min">
          <option value={price_min}>{price_min}</option>
          {minPrice.map((price, key) => (
            <option key={key} values={price}>
              {price}
            </option>
          ))}
        </select>
        <br />
        <label>Max Price</label>
        <select style={style} onChange={this.handleChange} value={price_max} name="price_max">
          <option value={price_max}>{price_max}</option>
          {maxPrice.map((price, key) => (
            <option key={key} values={price}>
              {price}
            </option>
          ))}
        </select>
        <br />
        <label>Number of rooms</label>
        <select onChange={this.handleChange} value={rooms} name="rooms">
          <option />
          {this.state.NumberOfRooms.map((room, key) => (
            <option key={key} values={room}>
              {room}
            </option>
          ))}
        </select>
        <label>Ordered by</label>
        <select onChange={this.handleChange} value={order} name="order">
          <option value={order}>{order}</option>
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
