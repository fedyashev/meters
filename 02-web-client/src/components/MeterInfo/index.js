import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import api from '../../lib/api';
import { prettyDate } from '../../lib/helpers';
import Pagination from 'react-js-pagination';
import ProgressBar from '../ProgressBar';

class MeterInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      meter: {
        id: props.match.params.meter_id
      },
      datas: [],
      limit: 15,
      activePage: 1,
      totalItemsCount: 0,
      isLoaded: false
    }
  }

  loadItems = (meter, pageNumber) => async () => {
    try {
      const { user: { token }, limit } = this.state;
      const result = await api.getCountDatas(token, meter.id);
      if (result && result.count > 0) {
        const offset = (pageNumber - 1) * limit;
        const datas = await api.getAllDataByMeterId(token, meter.id, limit, offset);
        this.setState({ ...this.state, meter, datas, totalItemsCount: result.count, activePage: pageNumber, isLoaded: true })
      }
      else {
        this.setState({ ...this.state, meter, isLoaded: true });
      }
    }
    catch ({ error }) {
      this.props.showWarningAlert(error.message);
    }
  };

  componentDidMount() {
    const token = this.state.user.token;
    const meter_id = this.state.meter.id;
    api.getMeterById(token, meter_id)
      .then(meter => {
        if (meter) {
          // api.getAllDataByMeterId(token, meter_id)
          //   .then(datas => {
          //     if (datas) {
          //       this.setState({ ...this.state, meter, datas, isLoaded: true});
          //     }
          //     else {
          //       this.setState({ ...this.state, meter, isLoaded: true});
          //     }
          //   })
          //   .catch(({ error }) => {
          //       this.props.showWarningAlert(error.message);
          //       this.props.history.goBack();
          //   });
          return Promise.resolve()
            .then(this.loadItems(meter, this.state.activePage))
            .catch(({ error }) => {
              this.props.showWarningAlert(error.message);
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

  handlerChangePage = pageNumber => {
    Promise.resolve()
      .then(this.loadItems(this.state.meter, pageNumber))
      .catch(({ error }) => {
        this.props.showWarningAlert(error.message);
      });
  }

  render() {
    if (!this.state.isLoaded) return <ProgressBar/>;
    const { meter } = this.state;
    return (
      <div className="container">
        <NavBar {...this.props}>
          <Link className="nav-link" to={`/owner/meters/${meter.id}/update`}>Изменить</Link>
          <Link className="nav-link" to={`/owner/meters/${meter.id}/delete`}>Удалить</Link>
          <Link className="nav-link" to={`/owner/meters/${meter.id}/addData`}>Добавить показания</Link>
        </NavBar>
        <h3 className="text-center mb-2">Счетчик</h3>
        <div className="table-responsive">
          <table className="table table-hover table-sm border-bottom">
            <tbody>
              <tr>
                <td><span className="font-weight-bold">Id</span></td>
                <td><span className="font-weight-bold">{meter.id}</span></td>
              </tr>
              <tr>
                <td><span className="font-weight-bold">Номер</span></td>
                <td><span className="font-weight-bold">{meter.number}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-center mb-2">Показания</h3>
        <Table datas={this.state.datas} />
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
};

const Table = props => {
  const { datas } = props;
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Дата</th>
          <th scope="col" className="text-center">Показание</th>
        </tr>
      </thead>
      <tbody style={{ fontSize: '0.85rem' }}>
        {
          datas && datas.map(data => <TableRow key={`${data.id}-${data.date}`} data={data} />)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const { data } = props;
  return (
    <tr>
      <td className="text-center">{prettyDate(data.date)}</td>
      <td className="text-center">{data.value}</td>
    </tr>
  );
}

export default MeterInfo;