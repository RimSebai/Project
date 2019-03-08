import React from 'react';
import { NavLink } from 'react-router-dom';
import service from '../service/service';
import Loading from './Loading';
import Filter from './Filter';

class HousesList extends React.Component {
  state = {
    houses: [],
    loading: true,
  };
  componentDidMount() {
    service.getHouses().then(res => this.setState({ houses: res, loading: false }));
  }
  handleSearch = searchCriteria => {
    let filterKeys = Object.keys(searchCriteria);
    let URLQuery = filterKeys
      .reduce((query, key) => {
        searchCriteria[key] !== '' && query.push(`${key}=${encodeURI(searchCriteria[key])}`);
        return query;
      }, [])
      .join('&');
    service.getHousesWithQuery(URLQuery).then(res => {});
  };
  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <div>
        <Filter houses={this.state.houses} onSearch={this.handleSearch} />
        <h1>Houses List</h1>
        {this.state.houses.length ? (
          this.state.houses.map(house => (
            <div key={house.Id}>
              <NavLink to={'/api/houses/' + house.Id}>
                <img src={house.images} alt="houseImage" />
                <p>Country Name: {house.location_country}</p>
                <p>City Name: {house.location_city}</p>
                <p>Address: {house.location_address}</p>
                <p>Number Of Rooms: {house.size_rooms}</p>
                <p>Price: {`${house.price_value} ${house.price_currency}`}</p>
                <p>Description: {house.description}</p>
                <p>Title: {house.title}</p>
                <p>Size Of Living Area: {house.size_living_area}</p>
                <p>Sold: {house.sold}</p>
                <p>Date: {house.market_date}</p>
              </NavLink>
            </div>
          ))
        ) : (
          <p>There is no houses</p>
        )}
      </div>
    );
  }
}

export default HousesList;
