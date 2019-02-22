import React from 'react';
import service from '../service/service';

class HouseDetails extends React.Component {
  state = { house: [] };
  componentDidMount() {
    let id = this.props.match.params.house_id;
    service
      .getHouseDetails(id)
      .then(res => this.setState({ house: res }))
      .catch(() => this.setState({ error: 'error' }));
  }
  render() {
    let paramsId = this.props.match.params.house_id;
    let houseId = this.state.house.id;
    return Number(paramsId) === houseId ? (
      <div>
        <p>{this.state.house.id}</p>
        <p>{this.state.house.price}</p>
      </div>
    ) : (
      <p>no house has this id</p>
    );
  }
}

export default HouseDetails;
