import React from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import {formatDate} from '../../lib/helpers';

const MeterAddData = props => {
  const token = props.user.token;
  const meter_id = props.match.params.meter_id;
  let val;
  const onClickAdd = e => {
    e.preventDefault();
    if (!val.value) {
      props.showWarningAlert("Не корректные показания счетчика");
      return;
    }
    const date = formatDate(Date.now());
    console.log(meter_id, date, val.value);
    api.createData(token, meter_id, date, val.value)
      .then(data => {
        if (data) {
          props.showSuccessAlert('Показания добавлены');
          props.history.goBack();
        }
        else {
          props.showWarningAlert('Неудалось добавить показания счетчика');
        }
      })
      .catch(({error}) => {
        props.showWarningAlert(error.message);
      });
  };
  return (
    <div className="container justify-content-center">
      <NavBar {...props}/>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div className="text-center font-weight-bold mb-5">
              <h3>Добавить показание счетчика</h3>
          </div>
          <form>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="Показание, кВт" required autoFocus ref={r => val = r}/>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" onClick={onClickAdd}>Добавить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeterAddData;