import React from 'react';
import service from '../service/service';

class AddHousesForm extends React.Component {
  state = { error: '', report: '' };
  handleSubmit = e => {
    e.preventDefault();
    try {
      JSON.parse(this.dataInput.value);
      service
        .addHouse(this.dataInput.value)
        .then(res => this.setState({ report: res }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      this.setState({ error: 'The data should be in JSON format' });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea ref={input => (this.dataInput = input)} />
          <br />
          <button type="submit">add</button>
        </form>
        <br />
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.state.report && (
          <p>{`you inserted ${this.state.report.numberOfValidHouses} house`}</p>
        )}
        {this.state.report &&
          this.state.report.finalReport.map((el, i) => {
            return (
              <div key={i}>
                <textarea value={JSON.stringify(el.insertedHouse, undefined, 4)} readOnly />
                <br />
                <span>{el.messages}</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default AddHousesForm;
