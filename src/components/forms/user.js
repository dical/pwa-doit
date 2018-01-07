import React from 'react';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Snack from '../snack';

import { test_value } from '../../helpers/form';
import {decode_errors, request} from '../../helpers/request';
import { set_cookie } from "../../helpers/cookie";

class FormUser extends React.Component {
    state = {
        user: {
            username: '',
            password: '',
            names: '',
            surnames: '',
            born: new Date(new Date(Date.now()).getFullYear() - 18, new Date(Date.now()).getMonth(), new Date(Date.now()).getDate()),
            sex: 'm',
            mail: '',
            address: {
                city: '',
                number: '',
                street: ''
            }
        },
        confirm: '',
        snack: {
            message: 'Registrando usuario',
            open: false
        }
    };

    handleChange = name => event => {
        let user = this.state.user; user[name] = event.target.value; this.setState({ user: user })
    };

    handleChangeBorn = event => {
        let user = this.state.user; user.born = new Date(event.target.value); this.setState({ user: user })
    };

    handleChangeConfirm = event => {
        this.setState({ confirm: event.target.value })
    };

    handleResponse = (request) => {
        switch (request.status) {
            case 201:
                this.handleSession(JSON.parse(request.response));
                break;
            case 403:
                this.handleSnack(decode_errors(request.response));
                break;
            default :
                this.handleSnack('Registro de usuario en mantenimiento.');
                break;
        }
    };

    handleSession = (user) => {
        if (user.hasOwnProperty('business')) {
            set_cookie('userRut', user.business.rut.body, 360)
        }

        set_cookie('userId', user._id, 360);

        window.location.href = '/'
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                message: typeof  message === 'string' ? message : this.state.snack.message,
                open: typeof  message === 'string'
            }
        })
    };

    render() {
        return (
            <form autoComplete='off'>
                <LinearProgress
                    classes={{ root: 'progress' }}
                    style={ this.state.snack.open ? {} : { display: 'none' } }
                />

                <fieldset disabled={ this.state.snack.open }>
                    <Typography
                        children='Información de contacto'
                        color='inherit'
                        style={{ flex: 1 }}
                        type='title'
                    />

                    <TextField
                        error={ !test_value("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Záéíóú])[a-zA-Záéíóú '~?!]{2,32}$", this.state.user.names) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres'
                        onChange={ this.handleChange('names') }
                        placeholder='Nombre(s)'
                        type='text'
                        value={ this.state.user.names }
                    />

                    <TextField
                        error={ this.state.user.surnames !== '' && !test_value("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Záéíóú])[a-zA-Záéíóú '~?!]{2,32}$", this.state.user.surnames) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres'
                        onChange={ this.handleChange('surnames') }
                        placeholder='Apellido(s)'
                        type='text'
                        value={ this.state.user.surnames }
                    />

                    <TextField
                        error={ !test_value("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", this.state.user.mail) }
                        fullWidth
                        helperText='Formato: abc123@dominio.abc'
                        onChange={ this.handleChange('mail') }
                        placeholder='Correo electrónico'
                        type='mail'
                        value={ this.state.user.mail }
                    />

                    <Typography
                        children='Nacimiento'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ new Date(Date.now()).getFullYear() - this.state.user.born.getFullYear() < 18 || new Date(Date.now()).getMonth() < this.state.user.born.getMonth() || (new Date(Date.now()).getMonth() === this.state.user.born.getMonth() && new Date(Date.now()).getDate() <= this.state.user.born.getDate()) }
                        fullWidth
                        helperText='Formato: 1-31/1-12/0-9999'
                        onChange={ this.handleChangeBorn }
                        placeholder='Fecha de nacimiento *'
                        style={{ width: '50%', margin: '0 16px 0 0' }}
                        type='date'
                        value={ this.state.user.born.toISOString().slice(0,10) }
                    />

                    <TextField
                        fullWidth
                        onChange={ this.handleChange('sex') }
                        helperText='Sexo'
                        select
                        SelectProps={{ native: true }}
                        style={{
                            lineHeight: 1,
                            width: 'calc(50% - 16px)'
                        }}
                        value={ this.state.user.sex }
                    >
                        <option value='f'>Femenino</option>
                        <option value='m'>Masculino</option>
                    </TextField>

                    <Typography
                        children='Información de usuario'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9]{5,15}$", this.state.user.username) }
                        fullWidth
                        helperText='Entre 5 a 15 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('username') }
                        placeholder='Nombre de usuario'
                        type='text'
                        value={ this.state.user.username }
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9]{8,15}$", this.state.user.password) }
                        fullWidth
                        helperText='Entre 8 a 15 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('password') }
                        placeholder='Contraseña'
                        type='password'
                        value={ this.state.user.password }
                    />

                    <TextField
                        error={ this.state.user.password !== this.state.confirm }
                        fullWidth
                        helperText='Confirmar contraseña'
                        onChange={ this.handleChangeConfirm }
                        placeholder='Ingrese nuevamente la contraseña'
                        type='password'
                        value={ this.state.confirm }
                    />

                    <Snack
                        close={ this.handleSnack }
                        message={ this.state.snack.message }
                        open={ this.state.snack.open }
                    />

                    <Button
                        children='Registrarse'
                        color='accent'
                        hidden
                        onClick={ () => { this.handleSnack('Registrando usuario', request('post', 'http://' + window.location.hostname + ':8081/users', this.state.user, this.handleResponse, true)) } }
                        raised
                        style={{ width: '100%', display: 'none' }}
                    />
                </fieldset>
            </form>
        );
    }
}

export default FormUser;
