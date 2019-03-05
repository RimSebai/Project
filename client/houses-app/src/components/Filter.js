import React from 'react';
import { withRouter } from 'react-router';

class Filter extends React.Component {
  state = {
    country: '',
    city: '',
    price_min: 0,
    price_max: 1000000,
    rooms: 0
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e, object) => {
    e.preventDefault();
    let results = [];
    for (let key in this.state) {
      results.push(`${key}=${this.state[key]}`);
      let URL = results.join('&');
      console.log(URL);
    }
  };

  render() {
    return (
      <form className="filter-form" onSubmit={this.handleSubmit}>
        <label>Select By Country</label>
        <select onChange={this.handleChange} name="country">
          <option values="country">country</option>
          {this.props.houses.map(house => (
            <option key={house.Id} values={house.location_country}>
              {house.location_country}
            </option>
          ))}
        </select>
        <label>Select By City</label>
        <select onChange={this.handleChange} name="city">
          <option values="city">city</option>
          {this.props.houses.map(house => (
            <option key={house.Id} values={house.location_city}>
              {house.location_city}
            </option>
          ))}
        </select>
        <label>Min Price</label>
        <select onChange={this.handleChange} name="price_min">
          <option values="0">0</option>
          <option values="50000">50000</option>
          <option values="25000">25000</option>
          <option values="500000">500000</option>
          <option values="1750000">1750000</option>
          ))}
        </select>
        <label>Max Price</label>
        <select onChange={this.handleChange} name="price_max">
          <option values="10000">10000</option>
          <option values="25000">25000</option>
          <option values="50000">50000</option>
          <option values="750000">750000</option>
          <option values="1000000">1000000</option>
          ))}
        </select>
        <label>Select By Number of rooms</label>
        <select onChange={this.handleChange} name="rooms">
          {this.props.houses.map(house => (
            <option key={house.Id} values={this.state.rooms}>
              {house.size_rooms}
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
