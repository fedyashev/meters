import React, { Component } from 'react';
import api from '../../lib/api';

class InspectorDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      inspector: {
        id: props.match.params.inspector_id
      }
    }
  }

  componentDidMount() {
    const token = this.state.user.token;
    const inspector_id = this.state.inspector.id;
    api.getInspectorById(token, inspector_id)
      .then(inspector => {
        if (inspector) {
          this.setState({...this.state, inspector: inspector});
        }
        else {
          this.setAlert('warning', 'Inspector not found');
          this.props.history.goBack();
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  }

  handleClickYes = e => {
    e.preventDefault();
    const token = this.state.user.token;
    const inspector_id = this.state.inspector.id;
    api.deleteInspectorById(token, inspector_id)
      .then(done => {
        if (done) {
          this.props.setAlert('success', 'Инспектор удален');
          this.props.history.go(-2);
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message)
      });
  }

  handleClickNo = e => {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const {inspector} = this.state;
    return (
      <div className="container pt-2">
        <div className="border p-5">
          <div className="mb-5">
            <p className="h3 text-center">{`Удалить инспектора ${inspector.name}?`}</p>
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

export default InspectorDelete;