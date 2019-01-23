import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import GoBackLink from '../GoBackLink';
import api from '../../lib/api';

class MeterInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      meter: {
        id: props.match.params.meter_id
      }
    }
  }

  componentDidMount() {
      const token = this.state.user.token;
      const meter_id = this.state.meter.id;
      api.getMeterById(token, meter_id)
          .then(meter => {
              if (meter) {
                  this.setState({ ...this.state, meter });
              }
              else {
                  this.props.showWarningAlert('Счетчик не найден');
                  this.props.history.goBack();
              }
          })
          .catch(({ error }) => {
              this.props.showWarningAlert(error.message);
              this.props.history.goBack();
          });
  }

  render() {
    const {meter} = this.state;
    return (
      <div className="container">
        <NavBar {...this.props} meter={meter} />
        <h3 className="text-center mb-2">Счетчик</h3>
        <div className="border-top border-bottom">
          <div>
            <span className="font-weight-bold">Id</span> : <span>{meter.id}</span>
          </div>
          <div>
            <span className="font-weight-bold">Номер</span> : <span>{meter.number}</span>
          </div>
        </div>
      </div>
    );
  }
};

const NavBar = props => {
    const { meter } = props;
    return (
        <nav className="nav my-2">
            <GoBackLink {...props} />
            <Link className="nav-link" to={`/owner/meters/${meter.id}/update`}>Изменить</Link>
            <Link className="nav-link" to={`/owner/meters/${meter.id}/delete`}>Удалить</Link>
        </nav>
    );
}

export default MeterInfo;