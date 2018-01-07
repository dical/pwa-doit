import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Snack from '../snack';

import { test_value, test_rut } from '../../helpers/form';
import { decode_errors, request } from '../../helpers/request';
import { set_cookie } from "../../helpers/cookie";

class FormBusiness extends Component {
    state = {
        user: {
            username: '',
            password: '',
            names: '',
            born: new Date(Date.now()),
            business: {
                rut: {
                    body: '',
                    checker: ''
                }
            },
            mail: '',
            address: {
                city: '',
                number: '',
                street: ''
            }
        },
        confirm: '',
        snack: {
            message: 'Registrando empresa...',
            open: false
        }
    };

    handleChange = name => event => {
        let user = this.state.user; user[name] = event.target.value; this.setState({ user: user })
    };

    handleChangeAddress = name => event => {
        let user = this.state.user; user.address[name] = event.target.value; this.setState({ user: user })
    };

    handleChangeBorn = event => {
        let user = this.state.user; user.born = new Date(event.target.value); this.setState({ user: user })
    };

    handleChangeConfirm = event => {
        this.setState({ confirm: event.target.value })
    };

    handleChangeRut = name => event => {
        let user = this.state.user; user.business.rut[name] = event.target.value; this.setState({ user: user })
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
                        error={ !test_value("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,32}$", this.state.user.names) }
                        fullWidth
                        helperText='Entre 2 a 32 caracteres y/o dígitos numéricos'
                        onChange={ this.handleChange('name') }
                        placeholder='Nombre de empresa *'
                        type='text'
                        value={ this.state.user.names }
                    />

                    <TextField
                        error={ !test_value("^\\d+$", this.state.user.business.rut.body) || !test_rut(this.state.user.business.rut.body + '-' + this.state.user.business.rut.checker) }
                        fullWidth
                        helperText='Ingrese su rut sin: puntos, guión y dígito verificador'
                        onChange={ this.handleChangeRut('body') }
                        placeholder='RUT *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type='number'
                        value={ this.state.user.business.rut.body }
                    />

                    <TextField
                        error={ !test_value("^\\d+$", this.state.user.business.rut.checker) || !test_rut(this.state.user.business.rut.body + '-' + this.state.user.business.rut.checker) }
                        fullWidth
                        helperText='Ingrese el dígito verificador del rut'
                        onChange={ this.handleChangeRut('checker') }
                        placeholder='Dígito verificador *'
                        style={{ width: '35%' }}
                        type='number'
                        value={ this.state.user.business.rut.checker }
                    />

                    <TextField
                        error={ !test_value("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", this.state.user.mail) }
                        fullWidth
                        helperText='Formato: empresa@dominio.com'
                        onChange={ this.handleChange('mail') }
                        placeholder='Correo electrónico *'
                        type='mail'
                        value={ this.state.user.mail }
                    />

                    <Typography
                        children='Dirección de la empresa'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9\\s,'-,{1}]{2,}$", this.state.user.address.street) }
                        fullWidth
                        helperText='Min. 2 caracteres'
                        onChange={ this.handleChangeAddress('street') }
                        placeholder='Calle *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type='text'
                        value={ this.state.user.address.street }
                    />

                    <TextField
                        error={ !test_value("^[\\d]{1,}$", this.state.user.address.number) }
                        fullWidth
                        helperText='Min 1 dígito numérico'
                        onChange={ this.handleChangeAddress('number') }
                        placeholder='Numero *'
                        style={{ width: 'calc(45% - 16px)' }}
                        type='number'
                        value={ this.state.user.address.number }
                    />

                    <TextField
                        error={ !test_value("^[a-zA-Z0-9\\s,'-,#]{2,}$", this.state.user.address.city) }
                        fullWidth
                        onChange={ this.handleChangeAddress('city') }
                        placeholder='Ciudad *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type='text'
                        value={ this.state.user.address.city }
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

                    <Typography
                        children='Fecha de fundación'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ new Date(Date.now()) < this.state.user.born }
                        fullWidth
                        helperText='Formato: 1-31/1-12/0-9999'
                        onChange={ this.handleChangeBorn }
                        placeholder='Fecha de nacimiento *'
                        type='date'
                        value={ this.state.user.born.toISOString().slice(0,10) }
                    />

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
                        helperText='Repita la contraseña'
                        onChange={ this.handleChangeConfirm }
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
                        onClick={ () => { this.handleSnack('Registrando empresa', request('post', 'http://' + window.location.hostname + ':8081/users', this.state.user, this.handleResponse, true)) } }
                        raised
                        style={{ width: '100%', display: 'none' }}
                    />
                </fieldset>
            </form>
        );
    }
}

export default FormBusiness;
