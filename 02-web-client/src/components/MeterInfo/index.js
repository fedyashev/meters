import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../NavBar';
import api from '../../lib/api';
import {parseDate} from '../../lib/helpers';

class MeterInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      meter: {
        id: props.match.params.meter_id
      },
      datas: [],
      isLoaded: false
    }
  }

  componentDidMount() {
      const token = this.state.user.token;
      const meter_id = this.state.meter.id;
      api.getMeterById(token, meter_id)
          .then(meter => {
              if (meter) {
                  api.getAllDataByMeterId(token, meter_id)
                    .then(datas => {
                      if (datas) {
                        this.setState({ ...this.state, meter, datas, isLoaded: true});
                      }
                      else {
                        this.setState({ ...this.state, meter, isLoaded: true});
                      }
                    })
                    .catch(({ error }) => {
                        this.props.showWarningAlert(error.message);
                        this.props.history.goBack();
                    });
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
    if (!this.state.isLoaded) return null;
    const {meter} = this.state;
    return (
      <div className="container">
        <NavBar {...this.props}>
            <Link className="nav-link" to={`/owner/meters/${meter.id}/update`}>Изменить</Link>
            <Link className="nav-link" to={`/owner/meters/${meter.id}/delete`}>Удалить</Link>
            <Link className="nav-link" to={`/owner/meters/${meter.id}/addData`}>Добавить показания</Link>
        </NavBar>
        <h3 className="text-center mb-2">Счетчик</h3>
        <div className="border-top border-bottom mb-5">
          <div>
            <span className="font-weight-bold">Id</span> : <span>{meter.id}</span>
          </div>
          <div>
            <span className="font-weight-bold">Номер</span> : <span>{meter.number}</span>
          </div>
        </div>
        <h3 className="text-center mb-2">Показания</h3>
        <Table datas={this.state.datas}/>
      </div>
    );
  }
};

const Table = props => {
  const {datas} = props;
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Дата</th>
          <th scope="col" className="text-center">Показание</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '0.85rem'}}>
        {
          datas && datas.map(data => <TableRow key={`${data.id}-${data.date}`} data={data}/>)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const {data} = props;
  return (
    <tr>
      <td className="text-center">{parseDate(data.date)}</td>
      <td className="text-center">{data.value}</td>
    </tr>
  );
}

export default MeterInfo;