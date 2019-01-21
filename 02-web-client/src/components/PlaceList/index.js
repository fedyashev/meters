import React, {Component} from 'react';
import api from '../../lib/api';

class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      places: []
    };
  }

  componentDidMount() {
    api.getAllPlaces(this.props.user.token)
      .then(places => {
        console.log(places);
        if (places) {
          this.setState({...this.state, places: places});
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    return (
      <div className="container justify-content-center pt-2">
        <Table users={this.state.places}/>
      </div>
    );
  }

};

const Table = props => {
  const {places} = props;
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Id</th>
          <th scope="col" className="text-center">Name</th>
          <th scope="col" className="text-center">Consumer</th>
          <th scope="col" className="text-center">Meter</th>
          <th scope="col" className="text-center">IsSignNeed</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '0.85rem'}}>
        {
            places && places.map(place => <TableRow key={`${place.id}-${place.name}`} place={place}/>)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const {place} = props;
  return (
    <tr>
      <td className="text-center">{place.id}</td>
      <td className="text-center">{place.name}</td>
      <td className="text-center">{place.consumer ? place.consumer.name : null}</td>
      <td className="text-center">{place.meter ? place.meter.number : null}</td>
      <td className="text-center">{place.isSignNeed}</td>
    </tr>
  );
}

export default PlaceList;