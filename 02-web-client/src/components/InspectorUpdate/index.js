import React, {Component} from 'react';
import api from '../../lib/api';

class InspectorUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inspector: {
        id: props.match.params.inspector_id
      },
      user: props.user,
      isLoding: false
    }
  }

  componentDidMount() {
    this.setState({...this.state, isLoding: true});
    api.getInspectorById(this.state.user.token, this.state.inspector.id)
      .then(inspector => {
        if (inspector) {
          this.setState({...this.state, inspector: inspector, isLoding: false});
        }
        else {
          this.setState({...this.state, isLoding: false}, () => {
            this.props.setAlert('warning', 'Inspector not found');
          });
        }
      })
      .catch(({error}) => {
        this.setState({...this.state, isLoding: false}, () => {
          this.props.setAlert('warning', error.message);
        });
      });
  }

  handleUpdateInspector = name => {
    if (!name) {
      this.props.setAlert('warning', 'Неправильное имя инспектора');
      return;
    }
    const token = this.state.user.token;
    const inspector_id = this.state.inspector.id;
    api.updateInspectorById(token, inspector_id, name)
      .then(inspector => {
        if (inspector) {
          this.props.setAlert('success', 'Имя инспектора успешно изменено');
          this.props.history.goBack();
        }
        else {
          this.props.setAlert('warning', 'Инспектор не найден');
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  }

  render() {
    const {inspector} = this.state;
    let name;
    const onClickSave = e => {
      e.preventDefault();
      this.handleUpdateInspector(name.value);
    };
    return (
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <div className="text-center font-weight-bold mb-5">
              <h3>Изменить имя инспектора</h3>
            </div>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Ф.И.О. инспектора" required ref={r => name = r} defaultValue={inspector.name}/>
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

export default InspectorUpdate;