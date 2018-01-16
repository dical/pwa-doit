import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

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
     handleSocialRequest = (callback) => {  
        let request = new XMLHttpRequest();
   
        request.open('GET', 'http://'+ window.location.hostname +':8081/auth/facebook', true);
        request.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        
        request.onreadystatechange = function() {
            if (request.readyState === 4 ) { 
                callback(request)
            }
        };

        request.send();

        
        /*request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 202) {            
                var data = request.responseText;
                console.log(data);
            }
        };*/
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
                        style={{ width: '50vw', maxWidth: 'fit-content' }}
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
                    <Button
                        children='Ingresar'
                        color="primary" 
                        onClick={ () => { this.handleSocialRequest(this.handleResponse) } }
                        disabled='disabled'
                        raised 
                        style={{
                        margin: '0px 0px',
                        padding: '0px 0px',
                        top: '12px'
                    }}>
                    <img
                        id="logo"
                        src={ "/images/facebook.png" }
                         alt={""}
                         style={{
                                     width:'100%'
                    }}/>
                    </Button> 

                    <Snack
                        close={ this.handleSnack }
                        message={ this.state.snack.message }
                        open={ this.state.snack.open }
                    />
                </fieldset>

                <Link
                    style={{ color: '#607D8B' }}
                    to='/recovery'
                >
                    <Typography
                        classes={{ root: 'hover-underline' }}
                        children='Recuperar contraseña'
                        color='inherit'
                        type='subheading'
                    />
                </Link>
            </form>
        );
    }
}

export default FormSession;
