import React from 'react';
import Alert from '../Alert';

const Login = props => {
    const {handlerLogin, handlerCloseAlert} = props;
    let login, password;
    const onClickLogin = e => {
        e.preventDefault();
        handlerLogin(login.value, password.value);
    };
    return (
        <div>
            {props.alert && <Alert type={props.alert.type} message={props.alert.message} handlerCloseAlert={handlerCloseAlert}/>}
            <div className="jumbotron d-flex align-items-center" style={{position: "absolute", top: "0", left: "0", right: "0", bottom: "0"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                            <div className="text-center font-weight-bold mb-5">
                                <h3>Учет электроэнергии</h3>
                            </div>
                            <form className="">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Имя пользователя" required autoFocus ref={r => login = r}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Пароль" required ref={r => password = r}/>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-block" onClick={onClickLogin}>Вход</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom mb-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4 col-offset-4 text-center">
                            <span className="text-muted">© 2019</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;