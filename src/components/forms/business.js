import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Snack from '../snack';

import { test_value, test_rut } from '../../helpers/form';
import { decode_errors } from '../../helpers/request';
import { set_cookie } from "../../helpers/cookie";

class FormBusiness extends Component {
    state = {
        name: '',
        rutBody: '',
        rutCheck: '',
        mail: '',
        street: '',
        number: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        username: '',
        password: '',
        confirm: '',
        fieldset: {
            disabled: false
        },
        snack: {
            message: 'Registrando empresa...',
            open: false
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    };

    handleDisable = () => {
        document.getElementById('progress-business').style.display = document.getElementById('progress-business').style.display === 'none' ? '' : 'none';

        this.setState({
            fieldset: {
                disabled: !this.state.fieldset.disabled
            }
        })
    };

    handleRequest = (callback) => {
        let request = new XMLHttpRequest();

        request.open('POST', 'http://' + window.location.hostname + ':8081/users', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() { if (request.readyState === 4) { callback(request)} };

        request.send(
            JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                names: this.state.name,
                business: {
                    rut: {
                        body: this.state.rutBody,
                        checker: this.state.rutCheck
                    }
                },
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
                this.handleSnack('Registro de empresa en mantenimiento.');
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
                    id='progress-business'
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        zIndex: 2001,
                        width: '100%',
                        display: 'none'
                    }}
                />

                <fieldset disabled={ this.state.fieldset.disabled }>
                    <Typography
                        children='Información de contacto'
                        color='inherit'
                        style={{ flex: 1 }}
                        type='title'
                    />

                    <TextField
                        error={ !test_value("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,32}$", this.state.name) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('name') }
                        placeholder='Nombre de empresa *'
                        type='text'
                        value={ this.state.name }
                    />

                    <TextField
                        error={ !test_value("^\\d+$", this.state.rutBody) || !test_rut(this.state.rutBody + '-' + this.state.rutCheck) }
                        fullWidth
                        helperText='Ingrese su rut sin: puntos, guión y dígito verificador'
                        onChange={ this.handleChange('rutBody') }
                        placeholder='RUT *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type='number'
                        value={ this.state.rutBody }
                    />

                    <TextField
                        error={ !test_value("^\\d+$", this.state.rutCheck) || !test_rut(this.state.rutBody + '-' + this.state.rutCheck) }
                        fullWidth
                        helperText='Ingrese el dígito verificador del rut'
                        onChange={ this.handleChange('rutCheck') }
                        placeholder='Dígito verificador *'
                        style={{ width: '35%' }}
                        type='number'
                        value={ this.state.rutCheck }
                    />

                    <TextField
                        error={ !test_value("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", this.state.mail) }
                        fullWidth
                        helperText='Formato: empresa@dominio.com'
                        onChange={ this.handleChange('mail') }
                        placeholder='Correo electrónico *'
                        type='mail'
                        value={ this.state.mail }
                    />

                    <Typography
                        children='Dirección de la empresa'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9\\s,'-,{1}]{2,}$", this.state.street) }
                        fullWidth
                        helperText='Min. 2 caracteres'
                        onChange={ this.handleChange('street') }
                        placeholder='Calle *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type='text'
                        value={ this.state.street }
                    />

                    <TextField
                        error={ !test_value("^[\\d]{1,}$", this.state.number) }
                        fullWidth
                        helperText='Min 1 dígito numérico'
                        onChange={ this.handleChange('number') }
                        placeholder='Numero *'
                        style={{ width: 'calc(45% - 16px)' }}
                        type='number'
                        value={ this.state.number }
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9\\s,'-,#]{2,}$", this.state.city) }
                        fullWidth
                        onChange={ this.handleChange('city') }
                        placeholder='Ciudad *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type='text'
                        value={ this.state.city }
                    />

                    <TextField
                        disabled={ true }
                        fullWidth
                        helperText='Region'
                        placeholder='State'
                        style={{ width: '35%' }}
                        type="text"
                        value={ 'Coquimbo' }
                    />

                    <TextField
                        error={ !test_value("^\\d{6,}$", this.state.zip) }
                        fullWidth
                        helperText='Min. 6 dígitos numéricos'
                        onChange={ this.handleChange('zip') }
                        placeholder='Codigo Postal'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type="text"
                        value={ this.state.zip }
                    />

                    <TextField
                        disabled={ true }
                        fullWidth
                        helperText='Pais'
                        placeholder='Country'
                        style={{ width: '35%' }}
                        type="text"
                        value={ 'Chile' }
                    />

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
                        helperText='Repita la contraseña'
                        onChange={ this.handleChange('confirm') }
                        placeholder='Confirmar contraseña'
                        type="password"
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

export default FormBusiness;
