import React, { Component } from 'react';
import api from '../../lib/api';
import ProgressBar from '../ProgressBar';

class InspectorDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      inspector: {
        id: props.match.params.inspector_id
      },
      isLoaded: false
    }
  }

  componentDidMount() {
    const token = this.state.user.token;
    const inspector_id = this.state.inspector.id;
    api.getInspectorById(token, inspector_id)
      .then(inspector => {
        if (!inspector) throw new Error({error: {message: 'Inspector not found'}});
        this.setState({...this.state, inspector, isLoaded: true});
      })
      .catch(({error}) => {
        this.setState({...this.state, isLoaded: true}, () => {
          this.props.showWarningAlert(error.message);
          this.props.history.goBack();
        });
      });
  }

  handleClickYes = e => {
    e.preventDefault();
    const token = this.state.user.token;
    const inspector_id = this.state.inspector.id;
    this.setState({...this.state, isLoaded: false});
    api.deleteInspectorById(token, inspector_id)
      .then(result => {
        if (result && result.done) {
          this.setState({...this.state, isLoaded: true}, () => {
            this.props.showSuccessAlert('Инспектор удален');
            this.props.history.go(-2);
          });
        }
      })
      .catch(({error}) => {
        this.setState({...this.state, isLoaded: true}, () => {
          this.props.showWarningAlert(error.message)
        });
      });
  }

  handleClickNo = e => {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    if (!this.state.isLoaded) return <ProgressBar/>;
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