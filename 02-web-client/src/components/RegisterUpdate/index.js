import React, { Component } from 'react';
import api from '../../lib/api';
import ProgressBar from '../ProgressBar';
import NavBar from '../NavBar';

class RegisterUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            register: {
                id: props.match.params.register_id
            },
            places: [],
            group_abonent_id: null,
            sub_abonents: [],
            isLoaded: false,
            processing: false
        };
    }

    componentDidMount = async () => {
        try {
            const token = this.state.user.token;
            const register_id = this.state.register.id;

            const register = await api.getRegisterById(token, register_id);
            const places = await api.getAllPlaces(token);

            if (register && places) {
                const group_abonent_id = register.group_abonent ? `${register.group_abonent.id}` : null;
                const sub_abonents = register.sub_abonents ? register.sub_abonents.map(p => `${p.id}`) : [];
                this.setState({ ...this.state, register, places, group_abonent_id: group_abonent_id, sub_abonents: sub_abonents, isLoaded: true });
            } else {
                throw new Error({ error: { error: { message: 'Не найден реестр или места' } } })
            }
        } catch ({ error }) {
            this.setState({ ...this.state, isLoaded: true }, () => {
                this.props.showWarningAlert(error.message);
            });
        }
    }

    handleUpdateRegister = (name, group_abonent_id, sub_abonents) => {
        const token = this.state.user.token;
        const register_id = this.state.register.id;
        this.setState({ ...this.state, processing: true }, () => {
            api.updateRegisterById(token, register_id, name, group_abonent_id, sub_abonents)
                .then(result => {
                    if (result && result.done) {
                        this.setState({ ...this.state, processing: false }, () => {
                            this.props.showSuccessAlert('Регистор именен');
                            this.props.history.goBack();
                        });
                    }
                    else {
                        this.setState({ ...this.state, processing: false }, () => {
                            this.props.showWarningAlert('Регистор не изменен');
                        });
                    }
                })
                .catch(({ error }) => {
                    this.setState({ ...this.state, processing: false }, () => {
                        this.props.showWarningAlert(error.message);
                    });
                });
        });
    }

    render() {
        if (!this.state.isLoaded) return <ProgressBar />;

        console.log(this.state);

        let name, group_abonent_id, sub_abonents_select, sub_abonents_list;

        const onClickUpdateRegister = e => {
            e.preventDefault();
            this.handleUpdateRegister(name.value, this.state.group_abonent_id, this.state.sub_abonents);
        };

        const onChangeGroupAbonent = e => {
            const id = group_abonent_id.value !== "0" ? group_abonent_id.value : null;
            this.setState({ ...this.state, group_abonent_id: id });
        };

        const onDoubleClickSubAbonentSelectList = e => {
            console.log(sub_abonents_select.value);

            this.setState({ ...this.state, sub_abonents: [...this.state.sub_abonents, sub_abonents_select.value] });
        };

        const handlerClickBtnAdd = e => {
            e.preventDefault();
            let sub = [];
            const options = sub_abonents_select.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    sub.push(options[i].value);
                }
            }
            if (sub.length > 0) {
                this.setState({ ...this.state, sub_abonents: [...this.state.sub_abonents, ...sub] });
            }
        };

        const handlerClickBtnRemove = e => {
            e.preventDefault();
            let sub = [];
            const options = sub_abonents_list.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    sub.push(options[i].value);
                }
            }
            const sub_abonents = this.state.sub_abonents
                .filter(p => !sub.includes(p));

            this.setState({ ...this.state, sub_abonents: [...sub_abonents] });
        };

        return (
            <div className="container justify-content-center">
                <NavBar {...this.props} />
                <div className="row justify-content-center mt-3">
                    <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="text-center font-weight-bold mb-2">
                            <h3>Изменить регистор</h3>
                        </div>
                        <form>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Название" required autoFocus ref={r => name = r} defaultValue={this.state.register.name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="group-abonent">Групповой абонент</label>
                                <select className="form-control" id="group-abonent" ref={r => group_abonent_id = r} onChange={onChangeGroupAbonent} defaultValue={this.state.register.group_abonent ? this.state.register.group_abonent.id : null}>
                                    <option value="0"></option>
                                    {
                                        this.state.places
                                            .filter(p => !this.state.sub_abonents.includes(Number(p.id).toString()))
                                            .map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="group-abonent">Выбор субабонентов</label>
                                <select multiple className="form-control" id="group-abonent" ref={r => sub_abonents_select = r} onDoubleClick={onDoubleClickSubAbonentSelectList}>
                                    {/* <option value="0"></option> */}
                                    {
                                        this.state.places
                                            .filter(p => (Number(p.id).toString() !== this.state.group_abonent_id) && !this.state.sub_abonents.includes(Number(p.id).toString()))
                                            .map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                                    }
                                </select>
                                <button className="btn btn-success btn-block" onClick={handlerClickBtnAdd}>Добавить</button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sub-abonent">Список субабонентов</label>
                                <select multiple className="form-control" id="sub-abonent" ref={r => sub_abonents_list = r}>
                                    {/* <option value="0"></option> */}
                                    {
                                        this.state.places
                                            .filter(p => this.state.sub_abonents.includes(Number(p.id).toString()))
                                            .map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                                    }
                                </select>
                                <button className="btn btn-danger btn-block" onClick={handlerClickBtnRemove}>Убрать</button>
                            </div>
                            {
                                this.state.processing ? <ProgressBar message={'Обработка...'} large={true} /> :
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block" onClick={onClickUpdateRegister}>Создать</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default RegisterUpdate;