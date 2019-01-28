import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';

class InspectorPlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      places: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    const token = this.state.user.token;
    api.getAllPlaces(token)
      .then(
        places => {
          if (places) {
            this.setState({ ...this.state, places, isLoaded: true });
          }
        },
        ({ error }) => {
          this.props.showWarningAlert(error.message);
        }
      )
      .catch(({ error }) => {
        this.props.showWarningAlert(error.message);
      });
  };

  render() {
    if (!this.state.isLoaded) return null;
    return (
      <div className="container justify-content-center">
        <NavBar {...this.props}>
          <Link className="nav-link" to='/inspector/places/create'>Добавить</Link>
        </NavBar>
        <Table places={this.state.places} />
      </div>
    );
  }

};

const Table = props => {
  const { places } = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center"><i className="fas fa-plus"></i></th>
            <th scope="col" className="text-center">Название</th>
            <th scope="col" className="text-center">Потребитель</th>
            <th scope="col" className="text-center">Счетчик</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '1rem' }}>
          {
            places && places.map(place => <TableRow key={`${place.id}-${place.name}`} place={place} />)
          }
        </tbody>
      </table>
    </div>
  );
};

const TableRow = props => {
  const { place } = props;
  return (
    <tr style={style(place)}>
      <td className="text-center"><Link to={`/inspector/places/${place.id}/addData`}><i className="text-secondary fas fa-plus"></i></Link></td>
      <td className="text-center"><Link to={`/inspector/places/${place.id}`}>{place.name}</Link></td>
      <td className="text-center">{place.consumer ? place.consumer.name : null}</td>
      <td className="text-center">{place.meter ? place.meter.number : null}</td>
    </tr>
  );
};

const style = place => {
  if (!place.meter) return {backgroundColor : '#b0bec5'};
  if (place.meter) {
    const {lastData} = place.meter;
    if (lastData && (new Date(lastData.date)).getMonth() === (new Date(Date.now())).getMonth()) {
      return {backgroundColor : '#ffab91'};
    }
    else {
      return {backgroundColor : '#c5e1a5'}
    }
  }
  return null;
};

export default InspectorPlaceList;