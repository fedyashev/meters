import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';

class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      places: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    api.getAllPlaces(this.props.user.token)
      .then(
        places => {
          if (places) {
            this.setState({ ...this.state, places: places, isLoaded: true });
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
    if (this.state.isLoaded) {
      return (
        <div className="container justify-content-center">
          <NavBar {...this.props}>
            <Link className="nav-link" to='/owner/places/create'>Добавить</Link>
          </NavBar>
          <Table places={this.state.places} />
        </div>
      );
    }
    return null;
  }

};

const Table = props => {
  const { places } = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">Id</th>
            <th scope="col" className="text-center">Название</th>
            <th scope="col" className="text-center">Потребитель</th>
            <th scope="col" className="text-center">Счетчик</th>
            <th scope="col" className="text-center">Подпись</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '0.85rem' }}>
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
    <tr>
      <td className="text-center">
        <Link to={`/owner/places/${place.id}`}>{place.id}</Link>
      </td>
      <td className="text-center">{place.name}</td>
      <td className="text-center">
        {
          place.consumer ? <Link to={`/owner/consumers/${place.consumer.id}`}>{place.consumer.name}</Link> : null
        }
      </td>
      <td className="text-center">
        {
          place.meter ? <Link to={`/owner/meters/${place.meter.id}`}>{place.meter.number}</Link> : null
        }
      </td>
      <td className="text-center">{place.isSignNeed ? 'Да' : 'Нет'}</td>
    </tr>
  );
};

export default PlaceList;