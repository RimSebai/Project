import React from 'react';
import { NavLink } from 'react-router-dom';
import service from '../service/service';
import Loading from './Loading';
import Filter from './Filter';

class HousesList extends React.Component {
  state = {
    houses: [],
    loading: true
  };
  componentDidMount() {
    service.getHouses().then(res => this.setState({ houses: res, loading: false }));
  }
  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <div>
        <Filter houses={this.state.houses} />
        <h1>Houses List</h1>
        {this.state.houses.length ? (
          this.state.houses.map(house => (
            <div key={house.Id}>
              <NavLink to={'/api/houses/' + house.Id}>
                <img src={house.images} alt="houseImage" />
                <p>{house.location_country}</p>
                <p>{house.location_city}</p>
                <p>{house.location_address}</p>
                <p>{house.size_rooms}</p>
                <p>{`${house.price_value} ${house.price_currency}`}</p>
                <p>{house.description}</p>
                <p>{house.title}</p>
                <p>{house.size_living_area}</p>
                <p>{house.sold}</p>
                <p>{house.price_value}</p>
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
