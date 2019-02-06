import React, { Component } from 'react';
import api from '../../lib/api';
import ProgressBar from '../ProgressBar';
import NavBar from '../NavBar';

class InspectorUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inspector: {
        id: props.match.params.inspector_id
      },
      user: props.user,
      isLoding: false,
      isLoaded: false,
      isProcessing: false
    }
  }

  componentDidMount() {
    //this.setState({...this.state, isLoding: true});
    const token = this.state.user.token;
    const inspector_id = this.state.inspector.id;
    api.getInspectorById(token, inspector_id)
      .then(inspector => {
        if (inspector) {
          this.setState({ ...this.state, inspector, isLoaded: true });
        }
        else {
          this.setState({ ...this.state, isLoaded: true }, () => {
            //this.props.setAlert('warning', 'Inspector not found');
            this.props.showWarningAlert('Inspector not found');
          });
        }
      })
      .catch(({ error }) => {
        this.setState({ ...this.state, isLoaded: true }, () => {
          //this.props.setAlert('warning', error.message);
          this.props.showWarningAlert(error.message);
        });
      });
  }

  handleUpdateInspector = name => {
    if (!name) {
      return this.props.showWarningAlert('Неправильное имя инспектора');
    }

    this.setState({...this.state, isProcessing: true});

    const token = this.state.user.token;
    const inspector_id = this.state.inspector.id;
    api.updateInspectorById(token, inspector_id, name)
      .then(inspector => {
        if (inspector) {
          this.setState({...this.state, isProcessing: false}, () => {
            this.props.showSuccessAlert('Имя инспектора успешно изменено');
            this.props.history.goBack();
          });
        }
        else {
          this.setState({...this.state, isProcessing: false}, () => {
            this.props.showWarningAlert('Инспектор не найден');
          });
        }
      })
      .catch(({ error }) => {
        this.setState({...this.state, isProcessing: false}, () => {
          this.props.showWarningAlert(error.message);
        });
      });
  }

  render() {
    if (!this.state.isLoaded) return <ProgressBar />
    const { inspector } = this.state;
    let name;
    const onClickSave = e => {
      e.preventDefault();
      this.handleUpdateInspector(name.value);
    };
    return (
      <div className="container">
        <NavBar {...this.props} />
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <div className="text-center font-weight-bold mb-5">
              <h3>Изменить имя инспектора</h3>
            </div>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Ф.И.О. инспектора" required ref={r => name = r} defaultValue={inspector.name} />
              </div>
              {
                this.state.isProcessing ?
                  <ProgressBar message={'Обработка...'} large={true} /> :
                  <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={onClickSave}>Сохранить</button>
                  </div>
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default InspectorUpdate;