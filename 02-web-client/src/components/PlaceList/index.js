import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      places: [],
      limit: 30,
      activePage: 1,
      totalItemsCount: 0,
      isLoaded: false
    };
  }

  loadItems = pageNumber => async () => {
    try {
      const { user: { token }, limit } = this.state;
      const result = await api.getCountPlaces(token);
      if (result && result.count > 0) {
        const offset = (pageNumber - 1) * limit;
        const places = await api.getAllPlaces(token, limit, offset);
        this.setState({ ...this.state, places, totalItemsCount: result.count, activePage: pageNumber, isLoaded: true })
      }
      else {
        this.setState({ ...this.state, isLoaded: true });
      }
    }
    catch ({ error }) {
      this.props.showWarningAlert(error.message);
    }
  };

  componentDidMount() {
    Promise.resolve()
      .then(this.loadItems(this.state.activePage))
      .catch(({ error }) => {
        this.props.showWarningAlert(error.message);
      });
  };

  handlerChangePage = pageNumber => {
    Promise.resolve()
      .then(this.loadItems(pageNumber))
      .catch(({ error }) => {
        this.props.showWarningAlert(error.message);
      });
  }

  render() {
    const {app} = this.state;
    if (this.state.isLoaded) {
      return (
        <div className="container justify-content-center">
          <NavBar {...this.props}>
            <Link className="nav-link" to={`/owner/places/create`}>Добавить</Link>
          </NavBar>
          <Table places={this.state.places} app={app}/>
          {
          this.state.totalItemsCount > this.state.limit ?
            <Pagination
              hideDisabled
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.limit}
              totalItemsCount={this.state.totalItemsCount}
              innerClass="pagination justify-content-center"
              itemClass="page-item"
              linkClass="page-link"
              onChange={this.handlerChangePage}
            /> : null
        }
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
            places && places.map(place => <TableRow key={`${place.id}-${place.name}`} place={place}/>)
          }
        </tbody>
      </table>
    </div>
  );
};

const TableRow = props => {
  const { place} = props;
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