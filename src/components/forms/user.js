import React from 'react';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Snack from '../snack';

import { test_value } from '../../helpers/form';
import { decode_errors } from '../../helpers/request';
import { set_cookie } from "../../helpers/cookie";

class FormUser extends React.Component {
    state = {
        names: '',
        surnames: '',
        born: '',
        sex: '',
        mail: '',
        street: '',
        number: '',
        city: '',
        username: '',
        password: '',
        confirm: '',
        fieldset: false,
        snack: {
            message: 'Signing user',
            open: false
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    };

    handleDisable = () => {
        this.setState({ fieldset: !this.state.fieldset })
    };

    handleRequest = (callback) => {
        let request = new XMLHttpRequest();

        request.open('POST', 'http://' + window.location.hostname + ':8081/users', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() { if (request.readyState === 4) { callback(request) } };

        request.send(
            JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                names: this.state.name,
                born: this.state.born,
                mail: this.state.mail,
                address: {
                    city: this.state.city,
                    number: this.state.number,
                    street: this.state.street
                }
            })
        );

        this.handleDisable()
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

        this.handleDisable()
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
                    style={ this.state.fieldset ? {} : { display: 'none' } }
                />

                <fieldset disabled={ this.state.fieldset }>
                    <Typography
                        children='Información de contacto'
                        color='inherit'
                        style={{ flex: 1 }}
                        type='title'
                    />

                    <TextField
                        error={ !test_value("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Z])[a-zA-Z '~?!]{2,32}$", this.state.names) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres'
                        onChange={ this.handleChange('names') }
                        placeholder='Nombre(s)'
                        type='text'
                        value={ this.state.names }
                    />

                    <TextField
                        error={ !test_value("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,32}$", this.state.surnames) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('surnames') }
                        placeholder='Apellido(s)'
                        type='text'
                        value={ this.state.surnames }
                    />

                    <TextField
                        error={ !test_value("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", this.state.mail) }
                        fullWidth
                        helperText='Formato: abc123@dominio.abc'
                        onChange={ this.handleChange('mail') }
                        placeholder='Correo electrónico'
                        type='mail'
                        value={ this.state.mail }
                    />

                    <Typography
                        children='Nacimiento'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        fullWidth
                        helperText='Formato: 1-31/1-12/0-9999'
                        onChange={ this.handleChange('born') }
                        placeholder='Fecha de nacimiento *'
                        style={{ width: '50%', margin: '0 16px 0 0' }}
                        type='date'
                        value={ this.state.born }
                    />

                    <TextField
                        fullWidth
                        onChange={ this.handleChange('sex') }
                        placeholder='Sexo'
                        select
                        SelectProps={{ native: true }}
                        style={{
                            lineHeight: 1,
                            width: 'calc(50% - 16px)'
                        }}
                        value={ this.state.sex }
                    >
                        <option value='F'>Femenino</option>
                        <option value='M'>Masculino</option>
                    </TextField>

                    <Typography
                        children='Información de usuario'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9]{5,15}$", this.state.username) }
                        fullWidth
                        helperText='Entre 5 a 15 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('username') }
                        placeholder='Nombre de usuario'
                        type='text'
                        value={ this.state.username }
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9]{8,15}$", this.state.password) }
                        fullWidth
                        helperText='Entre 8 a 15 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('password') }
                        placeholder='Contraseña'
                        type='password'
                        value={ this.state.password }
                    />

                    <TextField
                        error={ this.state.password !== this.state.confirm }
                        fullWidth
                        helperText='Confirmar contraseña'
                        onChange={ this.handleChange('confirm') }
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
                        onClick={ () => { this.handleRequest(this.handleResponse) } }
                        raised
                        style={{ width: '100%', display: 'none' }}
                    />
                </fieldset>
            </form>
        );
    }
}

export default FormUser;