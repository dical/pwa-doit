import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

import Snack from '../snack';

import { set_cookie } from '../../helpers/cookie';
import { test_value } from '../../helpers/form';
import { decode_errors } from '../../helpers/request';

class FormSession extends Component {
    state = {
        fieldset: false,
        password: '',
        snack: {
            message: 'Registrando usuario',
            open: false
        },
        username: ''
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    };

    handleDisable = () => {
        this.setState({ fieldset: !this.state.fieldset })
    };

    handleRequest = (callback) => {
        let request = new XMLHttpRequest();

        request.open('POST', 'http://' + window.location.hostname + ':8081/sessions', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) { callback(request) }
        };

        request.send(
            JSON.stringify({
                username: this.state.username,
                password: this.state.password
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
                this.handleSnack("Inicio de sesión en mantenimiento.");
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
            <form className='text-align-center'>
                <LinearProgress
                    classes={{ root: 'progress' }}
                    style={ this.state.fieldset ? {} : { display: 'none' } }
                />

                <fieldset disabled={ this.state.fieldset }>
                    <img
                        alt=''
                        src={ '/images/logo.png' }
                        style={{ width: '70vw' }}
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

                    <Button
                        children='Ingresar'
                        color='primary'
                        disabled={ !test_value("^[a-zA-Z0-9]{5,15}$", this.state.username) || !test_value("^[a-zA-Z0-9]{8,15}$", this.state.password) }
                        onClick={ () => { this.handleRequest(this.handleResponse) } }
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

export default FormSession;
