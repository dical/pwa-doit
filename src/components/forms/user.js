import React from 'react';

import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Snack from '../snackDefault'

class Registry extends React.Component {
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
        fieldset: {
            disabled: false
        },
        snack: {
            message: 'Signing user',
            open: false
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleDisable = () => {
        this.setState({
            fieldset: {
                disabled: !this.state.fieldset.disabled
            }
        })
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            disable = this.handleDisable,
            message = this.handleSnack,
            success = this.props.onRequestSucess;

        message("Signing user");
        document.getElementById('progress-user').style.display = '';

        request.open('POST', 'http://' + window.location.hostname + ':8081/users', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201: success(request.response);
                        break;
                    case 403: message("Can't add the user\n" + getErrors(request.response));
                        break;
                    default : message("Service don't respond");
                        break;
                }

                disable();
                document.getElementById('progress-user').style.display = 'none';
            }
        };

        disable();

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
            <form
                autoComplete='off'
                id='form-user'
                style={{ lineHeight: 4, paddingBottom: 48 }}
            >
                <LinearProgress
                    id='progress-user'
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        zIndex: 2001,
                        width: '100%',
                        display: 'none'
                    }}
                />

                <fieldset
                    disabled={ this.state.fieldset.disabled }
                    style={{
                        border: 0,
                        margin: 0,
                        padding: 0
                    }}
                >
                    <Typography
                        children='Información de contacto'
                        color='inherit'
                        style={{ flex: 1 }}
                        type='title'
                    />

                    <TextField
                        error={ !test("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Z])[a-zA-Z '~?!]{2,32}$", this.state.names) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres'
                        onChange={ this.handleChange('names') }
                        placeholder='Nombre(s)'
                        type="text"
                        value={ this.state.names }
                    />

                    <TextField
                        error={ !test("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,32}$", this.state.surnames) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('surnames') }
                        placeholder='Apellido(s)'
                        type="text"
                        value={ this.state.surnames }
                    />

                    <TextField
                        error={ !test("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", this.state.mail) }
                        fullWidth
                        helperText='Formato: abc123@dominio.abc'
                        onChange={ this.handleChange('mail') }
                        placeholder='Mail *'
                        type="mail"
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
                        type="date"
                        value={ this.state.born }
                    />

                    <TextField
                        fullWidth
                        onChange={ this.handleChange('sex') }
                        placeholder='Sexo *'
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
                        error={ !test("^[a-zA-Z0-9]{5,15}$", this.state.username) }
                        fullWidth
                        helperText='Enter between 5 to 15 characters or/and digit number'
                        onChange={ this.handleChange('username') }
                        placeholder='Nombre de usuario'
                        type="text"
                        value={ this.state.username }
                    />

                    <TextField
                        error={ !test("^[a-zA-Z0-9]{8,15}$", this.state.password) }
                        fullWidth
                        helperText='Enter between 8 to 15 characters or/and digit number'
                        onChange={ this.handleChange('password') }
                        placeholder='Contraseña'
                        type="password"
                        value={ this.state.password }
                    />

                    <TextField
                        error={ this.state.password !== this.state.confirm }
                        fullWidth
                        helperText='Repeat before password'
                        onChange={ this.handleChange('confirm') }
                        placeholder='Repetir contraseña'
                        type="password"
                        value={ this.state.confirm }
                    />

                    <Snack
                        close={ this.handleSnack }
                        message={ this.state.snack.message }
                        open={ this.state.snack.open }
                    />

                    <button type='button' onClick={ this.handleRequest } hidden>&nbsp;</button>
                </fieldset>

            </form>
        );
    }
}

function getErrors(response) {
    let errors = JSON.parse(response),
        string = '';

    if (errors.hasOwnProperty('errors')) {
        for (let property in errors.errors) {
            if (errors.errors.hasOwnProperty(property)) {
                string = string + errors.errors[property].message + '\n'
            }
        }
    } else {
        if (errors.hasOwnProperty('code')) {
            string = textFields[errors.errmsg.split('index: ').pop().split('_').reverse().pop()] + ' ya registrado.'
        }
    }

    return string
}

function test(exp, val) {
    return (new RegExp(exp)).test(val)
}

let textFields = {
    'username': 'Nombre de usuario',
    'business.rut.body': 'Rut de empresa',
    'mail': 'Correo electrónico'
};

export default Registry;
