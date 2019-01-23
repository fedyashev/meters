import React, {Component} from 'react';
import api from '../../lib/api';
import GoBackLink from '../GoBackLink';

class MeterUpdate extends Component {
  
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
          this.setState({...this.state, meter});
        }
        else {
          this.props.showWarningAlert('Счетчик не найден');
          this.props.history.goBack();
        }
      })
      .catch(({error}) => {
        this.props.showWarningAlert(error.message);
        this.props.history.goBack();
      });
  }

  handleUpdateMeter = number => {
    if (!number) {
      this.props.showWarningAlert('Некорректный номер счетчика');
      return;
    }
    const token = this.state.user.token;
    const meter_id = this.state.meter.id;
    api.updateMeterById(token, meter_id, number)
      .then(meter => {
        if (meter) {
          this.props.showSuccessAlert('Счетчик успешно изменен');
          this.props.history.goBack();
        }
        else {
          this.props.showWarningAlert("Неудалось изменить счетчик");
        }
      })
      .catch(({error}) => {
        this.props.showWarningAlert(error.message);
      });
  }

  render() {
    let number;
    const {meter} = this.state;
    const onClickSave = e => {
      e.preventDefault();
      this.handleUpdateMeter(number.value);
    }
    return (
      <div className="container">
        <NavBar {...this.props}/>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <div className="text-center font-weight-bold mb-5">
              <h3>Редактировать счетчик</h3>
            </div>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Номер счетчика" required ref={r => number = r} defaultValue={meter.number}/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={onClickSave}>Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

const NavBar = props => {
  return (
    <nav className="nav my-2">
      <GoBackLink {...props}/>
    </nav>
  );
};

export default MeterUpdate;