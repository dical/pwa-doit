import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

import Snack from '../snackDefault';

class FormSession extends Component {
    state = {
        fieldset: {
            disabled: false
        },
        password: '',
        snack: {
            message: 'Logging user',
            open: false
        },
        username: ''
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
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
        document.getElementById('progress-login').style.display = '';

        request.open('POST', 'http://' + window.location.hostname + ':8081/sessions', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201: success(request.response);
                        break;
                    case 403: message(getErrors(request.response));
                        break;
                    default : message("Service don't respond");
                        break;
                }

                disable();

                if (document.getElementById('progress-login') !== null) {
                    document.getElementById('progress-login').style.display = 'none';
                }
            }
        };

        disable();

        request.send(
            JSON.stringify({
                username: this.state.username,
                password: this.state.password
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
            <form style={{ textAlign: 'center' }}>
                <LinearProgress
                    id='progress-login'
                    style={{position: 'fixed', left: 0, top: 0, zIndex: 2001, width: '100%', display: 'none'}}
                />

                <fieldset
                    disabled={ this.state.fieldset.disabled }
                    style={{border: 0, lineHeight: 4, margin: 0, padding: '0 16px'}}
                >
                    <img
                        src={ '/images/logo.png' }
                        style={{ width: '70vw', maxWidth: 'fit-content' }}
                    />

                    <TextField
                        error={ !test("^[a-zA-Z0-9]{5,15}$", this.state.username) }
                        fullWidth
                        helperText='Entre 5 a 15 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('username') }
                        placeholder='Nombre de usuario'
                        type='text'
                        value={ this.state.username }
                    />

                    <TextField
                        error={ !test("^[a-zA-Z0-9]{8,15}$", this.state.password) }
                        fullWidth
                        helperText='Entre 8 a 15 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('password') }
                        placeholder='Contraseña'
                        type='password'
                        value={ this.state.password }
                    />

                    <Button
                        children='Ingresar'
                        color='primary'
                        disabled={ !test("^[a-zA-Z0-9]{5,15}$", this.state.username) || !test("^[a-zA-Z0-9]{8,15}$", this.state.password) }
                        onClick={ this.handleRequest }
                        raised
                        style={{ width: '-webkit-fill-available' }}
                    />

                    <Snack
                        close={ this.handleSnack }
                        message={ this.state.snack.message }
                        open={ this.state.snack.open }
                    />
                </fieldset>
            </form>
        );
    }
}

function test(exp, val) {
    return (new RegExp(exp)).test(val)
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

function setCookie(name, value, days) {
    let date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/"
}

function setUser(res) {
    setCookie('userId', res._id, 360);

    if (res.hasOwnProperty('business')) {
        setCookie('userRut', res.business.rut.body, 360)
    }

    document.getElementById('nav-activities').click()
}

let textFields = {
    'username': 'Nombre de usuario',
    'business.rut.body': 'Rut de empresa',
    'mail': 'Correo electrónico'
};

export default FormSession;
