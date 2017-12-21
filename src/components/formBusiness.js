import React, { Component } from 'react';

import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Snack from './snackDefault'

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
            message: 'Signing business',
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

        message("Signing business");
        document.getElementById('progress-business').style.display = '';

        request.open('POST', 'http://' + window.location.hostname + ':8081/users', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201: success(request.response);
                        break;
                    case 403: message("Can't add the business\n" + getErrors(request.response));
                        break;
                    default : message("Service don't respond");
                        break;
                }

                disable();
                document.getElementById('progress-business').style.display = 'none';
            }
        };

        disable();

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
                id='form-business'
                style={{ lineHeight: 4, paddingBottom: 48 }}
            >
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

                <fieldset
                    disabled={ this.state.fieldset.disabled }
                    style={{
                        border: 0,
                        margin: 0,
                        padding: 0
                    }}
                >
                    <Typography
                        children='Contact information'
                        color='inherit'
                        style={{ flex: 1 }}
                        type='title'
                    />

                    <TextField
                        error={ !test("^(?!\\s)(?!.*\\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,32}$", this.state.name) }
                        fullWidth
                        helperText='Enter between 2 to 32 characters or/and digit number'
                        onChange={ this.handleChange('name') }
                        placeholder='Business name *'
                        type="text"
                        value={ this.state.name }
                    />

                    <TextField
                        error={ !test("^\\d+$", this.state.rutBody) }
                        fullWidth
                        helperText='Enter min 1-digit number'
                        onChange={ this.handleChange('rutBody') }
                        placeholder='RUT *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type="number"
                        value={ this.state.rutBody }
                    />

                    <TextField
                        error={ !test("^\\d+$", this.state.rutCheck) }
                        fullWidth
                        helperText='Enter check digit'
                        onChange={ this.handleChange('rutCheck') }
                        inputProps={{ min: 0, max: 9 }}
                        placeholder='Check Digit *'
                        style={{ width: '35%' }}
                        type="number"
                        value={ this.state.rutCheck }
                    />

                    <TextField
                        error={ !test("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", this.state.mail) }
                        fullWidth
                        helperText='Format: business@doit.com'
                        onChange={ this.handleChange('mail') }
                        placeholder='Mail *'
                        type="mail"
                        value={ this.state.mail }
                    />

                    <Typography
                        children='Billing address'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ !test("^[a-zA-Z0-9\\s,'-,{1}]{2,}$", this.state.street) }
                        fullWidth
                        helperText='Enter min 2 characters'
                        onChange={ this.handleChange('street') }
                        placeholder='Street *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type="text"
                        value={ this.state.street }
                    />

                    <TextField
                        error={ !test("^[\\d]{1,}$", this.state.number) }
                        fullWidth
                        helperText='Enter min 1-digit number'
                        onChange={ this.handleChange('number') }
                        placeholder='Number *'
                        style={{ width: 'calc(45% - 16px)' }}
                        type="number"
                        value={ this.state.number }
                    />

                    <TextField
                        error={ !test("^[a-zA-Z0-9\\s,'-,#]{2,}$", this.state.city) }
                        fullWidth
                        onChange={ this.handleChange('city') }
                        placeholder='City *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type="text"
                        value={ this.state.city }
                    />

                    <TextField
                        disabled={ true }
                        fullWidth
                        placeholder='State'
                        style={{ width: '35%' }}
                        type="text"
                        value={ 'Coquimbo' }
                    />

                    <TextField
                        error={ !test("^\\d{6,}$", this.state.zip) }
                        fullWidth
                        helperText='Enter min 6-digit number'
                        onChange={ this.handleChange('zip') }
                        placeholder='Zip Code *'
                        style={{ width: '55%', margin: '0 16px 0 0' }}
                        type="text"
                        value={ this.state.zip }
                    />

                    <TextField
                        disabled={ true }
                        fullWidth
                        placeholder='Country'
                        style={{ width: '35%' }}
                        type="text"
                        value={ 'Chile' }
                    />

                    <Typography
                        children='Sign in information'
                        color='inherit'
                        style={{ flex: 1, marginTop: 24 }}
                        type='title'
                    />

                    <TextField
                        error={ !test("^[a-zA-Z0-9]{5,15}$", this.state.username) }
                        fullWidth
                        helperText='Enter between 5 to 15 characters or/and digit number'
                        onChange={ this.handleChange('username') }
                        placeholder='Username'
                        type="text"
                        value={ this.state.username }
                    />

                    <TextField
                        error={ !test("^[a-zA-Z0-9]{8,15}$", this.state.password) }
                        fullWidth
                        helperText='Enter between 8 to 15 characters or/and digit number'
                        onChange={ this.handleChange('password') }
                        placeholder='Password'
                        type="password"
                        value={ this.state.password }
                    />

                    <TextField
                        error={ this.state.password !== this.state.confirm }
                        fullWidth
                        helperText='Repeat before password'
                        onChange={ this.handleChange('confirm') }
                        placeholder='Confirm Password'
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

function checkDigit11(r) {
    let n = r.replace('.','').replace('-',''),
        c = n.slice(0, -1),
        v = n.slice(-1).toLowerCase(),
        s = 0,
        m = 2;

    for(let i = 1; i <= c.length; i++) {
        let index = m * n.charAt(c.length - i);

        s = s + index;

        if(m < 7) { m = m + 1; } else { m = 2; }
    }

    v = (v === 'k') ? 10 : v;
    v = (v === '0') ? 11 : v;

    return parseInt(v, 0) === parseInt(11 - (s % 11), 0);
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

export default FormBusiness;