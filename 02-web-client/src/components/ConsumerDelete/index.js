import React, { Component } from 'react';
import api from '../../lib/api';

class ConsumerDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      consumer: {
        id: props.match.params.consumer_id
      }
    }
  }

  componentDidMount() {
    const token = this.state.user.token;
    const consumer_id = this.state.consumer.id;
    api.getConsumerById(token, consumer_id)
      .then(consumer => {
        if (consumer) {
          this.setState({...this.state, consumer});
        }
        else {
          this.props.showWarningAlert('Потребитель не найден');
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
    const consumer_id = this.state.consumer.id;
    api.deleteConsumerById(token, consumer_id)
      .then(done => {
        if (done) {
          this.props.showSuccessAlert('Потребитель удален');
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
    const {consumer} = this.state;
    return (
      <div className="container pt-2">
        <div className="border p-5">
          <div className="mb-5">
            <p className="h3 text-center">{`Удалить потребителя ${consumer.name}?`}</p>
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

export default ConsumerDelete;