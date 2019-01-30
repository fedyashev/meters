import React, { Component } from 'react';
import api from '../../lib/api';
import ProgressBar from '../ProgressBar';
import NavBar from '../NavBar';

class RegisterCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            places: [],
            group_abonent_id: null,
            sub_abonentes: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        const token = this.state.user.token;
        api.getAllPlaces(token)
            .then(places => {
                if (places) {
                    this.setState({ ...this.state, places, isLoaded: true })
                }
                else {
                    this.setState({ ...this.state, isLoaded: true }, () => {
                        this.props.showWarningAlert('Места не найдены');
                    });
                }
            })
            .catch(({ error }) => {
                this.setState({ ...this.state, isLoaded: true }, () => {
                    this.props.showWarningAlert(error.message);
                });
            });
    }

    render() {
        if (!this.state.isLoaded) return <ProgressBar />;

        let name, group_abonent_id, sub_abonentes_select, sub_abonentes_list;

        const onClickRegisterCreate = e => {
            e.preventDefault();
            console.log(name.value, group_abonent_id.value);
        };

        const onChangeGroupAbonent = e => {
            //console.log(e);
            console.log(typeof group_abonent_id.value, group_abonent_id.value);
            const id = group_abonent_id.value !== "0" ? group_abonent_id.value : null;
            this.setState({...this.state, group_abonent_id: id});
        };

        const onDoubleClickSubAbonentSelectList = e => {
            console.log(sub_abonentes_select.value);

            this.setState({...this.state, sub_abonentes: [...this.state.sub_abonentes, sub_abonentes_select.value]});
        };

        const handlerClickBtnAdd = e => {
            e.preventDefault();
            //console.log(sub_abonentes_select.list);
            let sub = [];
            const options = sub_abonentes_select.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    sub.push(options[i].value);
                }
            }
            if (sub.length > 0) {
                this.setState({...this.state, sub_abonentes: [...this.state.sub_abonentes, ...sub]});
            }
            //console.log(sub);
        };

        const handlerClickBtnRemove = e => {
            e.preventDefault();
            let sub = [];
            const options = sub_abonentes_list.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    sub.push(options[i].value);
                }
            }
            const sub_abonentes = this.state.sub_abonentes
                .filter(p => !sub.includes(p));

            this.setState({...this.state, sub_abonentes: [...sub_abonentes]});
        };

        return (
            <div className="container justify-content-center">
                <NavBar {...this.props} />
                <div className="row justify-content-center mt-3">
                    <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="text-center font-weight-bold mb-2">
                            <h3>Создать регистор</h3>
                        </div>
                        <form>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Название" required autoFocus ref={r => name = r} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="group-abonent">Групповой абонент</label>
                                <select className="form-control" id="group-abonent" ref={r => group_abonent_id = r} onChange={onChangeGroupAbonent}>
                                    <option value="0"></option>
                                    {
                                        this.state.places
                                            .filter(p => !this.state.sub_abonentes.includes(Number(p.id).toString()))
                                            .map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="group-abonent">Выбор субабонентов</label>
                                <select multiple className="form-control" id="group-abonent" ref={r => sub_abonentes_select = r} onDoubleClick={onDoubleClickSubAbonentSelectList}>
                                    {/* <option value="0"></option> */}
                                    {
                                        this.state.places
                                            .filter(p => (Number(p.id).toString() !== this.state.group_abonent_id) && !this.state.sub_abonentes.includes(Number(p.id).toString()))
                                            .map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                                    }
                                </select>
                                <button className="btn btn-success btn-block" onClick={handlerClickBtnAdd}>Добавить</button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sub-abonent">Список субабонентов</label>
                                <select multiple  className="form-control" id="sub-abonent" ref={r => sub_abonentes_list = r}>
                                    {/* <option value="0"></option> */}
                                    {
                                        this.state.places
                                            .filter(p => this.state.sub_abonentes.includes(Number(p.id).toString()))
                                            .map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                                    }
                                </select>
                                <button className="btn btn-danger btn-block" onClick={handlerClickBtnRemove}>Убрать</button>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" onClick={onClickRegisterCreate}>Создать</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default RegisterCreate;