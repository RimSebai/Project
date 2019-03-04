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
        <Filter />
        <h1>Houses List</h1>
        {this.state.houses.length ? (
          this.state.houses.map(house => (
            <div key={house.id}>
              <NavLink to={'/api/houses/' + house.id}>
                <p>{house.id}</p> <p>{house.price}</p>{' '}
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
