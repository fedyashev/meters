import React, {Component} from 'react';
import api from '../../../../lib/api';
import NavBar from '../../../NavBar';
import {Link} from 'react-router-dom';

class PlaceAuditList extends Component {
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
    api.getAllPlacesForAudit(token)
      .then(
        places => {
          console.log(places);
          if (places) {
            this.setState({...this.state, places, isLoaded: true});
          }
        },
        ({error}) => {
          this.setState({...this.state, isLoaded: true}, () => {
            this.props.showWarningAlert(error.message);
          });
        }
      )
      .catch(({error}) => {
        this.setState({...this.state, isLoaded: true}, () => {
          this.props.showWarningAlert(error.message);
        });
      });
  }

  render() {
    if (!this.state.isLoaded) return null;
    return (
      <div className="container justify-content-center">
        <NavBar {...this.props}/>
        <Table places={this.state.places}/>
      </div>
    );
  }
};

const Table = props => {
  const {places} = props;
  return (
    <table className="table table-bordered table-hover table-responsive-sm table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Id</th>
          <th scope="col" className="text-center">Название</th>
          <th scope="col" className="text-center">Потребитель</th>
          <th scope="col" className="text-center">Счетчик</th>
          <th scope="col" className="text-center">Подпись</th>
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
      <td className="text-center">
        <Link to={`/inspector/places/${place.id}`}>{place.id}</Link>
      </td>
      <td className="text-center">{place.name}</td>
      <td className="text-center">{place.consumer.name}</td>
      <td className="text-center">{place.meter.number}</td>
      <td className="text-center">{place.isSignNeed ? 'Да' : 'Нет'}</td>
    </tr>
  );
};

export default PlaceAuditList;