import React, { Component } from 'react';
import api from '../../lib/api';

class MeterDelete extends Component {
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

  handleClickYes = e => {
    e.preventDefault();
    const token = this.state.user.token;
    const meter_id = this.state.meter.id;
    api.deleteMeterById(token, meter_id)
      .then(done => {
        if (done) {
          this.props.showSuccessAlert('Счетчик удален');
          this.props.history.go(-2);
        }
      })
      .catch(({error}) => {
        this.props.showWarningAlert(error.message);
      });
  }

  handleClickNo = e => {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const {meter} = this.state;
    return (
      <div className="container pt-2">
        <div className="border p-5">
          <div className="mb-5">
            <p className="h3 text-center">{`Удалить счетчик ${meter.number}?`}</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="ml-5">
              <button className="btn btn-success" onClick={this.handleClickYes}>Yes</button>
            </div>
            <div className="mr-5">
              <button className="btn btn-danger" onClick={this.handleClickNo}>No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MeterDelete;