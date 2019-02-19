import React, {Component} from 'react';
import api from '../../lib/api';
import GoBackLink from '../GoBackLink';
import ProgressBar from '../ProgressBar';

class MeterLink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false
    }
  }

  handleCreateMeter = number => {
    if (!number) {
      this.props.showWarningAlert('Некорректный номер счетчика');
      return;
    }
    const token = this.props.user.token;

    this.setState({...this.state, isProcessing: true});

    api.createMeter(token, number)
      .then(meter => {
        if (meter) {
          this.setState({...this.state, isProcessing: false}, () => {
            this.props.showSuccessAlert('Счетчик добавлен');
            this.props.history.goBack();
          });
        }
        else {
          this.setState({...this.state, isProcessing: false}, () => {
            this.props.showWarningAlert('Неудалось добавить счетчик');
          });
        }
      })
      .catch(({error}) => {
        this.setState({...this.state, isProcessing: false}, () => {
          this.props.showWarningAlert(error.message);
        });
      });
  }

  render() {
    let number;
    const onClickCreate = e => {
      e.preventDefault();
      this.handleCreateMeter(number.value);
    }
    return (
      <div className="container">
        <NavBar {...this.props}/>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <div className="text-center font-weight-bold mb-5">
              <h3>Добавить счетчик</h3>
            </div>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Номер счетчика" required ref={r => number = r}/>
              </div>
              <div className="form-group">
                {
                  this.state.isProcessing ? 
                    <ProgressBar message={'Создание счетчика...'} large={true}/> :
                    <button className="btn btn-primary btn-block" onClick={onClickCreate}>Добавить</button>
                }
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

export default MeterLink;