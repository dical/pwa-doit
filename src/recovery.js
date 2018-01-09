import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { request } from './helpers/request';

class Recovery extends Component {
    state = {
        mail: '',
        response: {
            display: 'none'
        },
        text: 'Correo enviado'
    };

    handleChange = (event) => {
        this.setState({ mail: event.target.value, response: { display: 'none' } })
    };

    handleRequest = () => {
        request('post', 'http://' + window.location.hostname + ':8081/recovery', { mail: this.state.mail }, this.handleResponse, true);

        this.setState({
            mail: '',
            response: { width: '100%', textAlign: 'center' },
            text: 'Buscando correo'
        })
    };

    handleResponse = (request) => {
        switch (request.status) {
            case 200:
                this.setState({ text: 'Correo enviado' });
                break;
            default:
                this.setState({ text: 'Email no encontrado' });
                break
        }
    };

    render() {
        return (
            <div className='padding-top-64' style={{ paddingLeft: 16, paddingRight: 16 }}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Link to={ '/login' }>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color='contrast'
                            />
                        </Link>

                        <Typography
                            children='Recuperar contraseña'
                            color='inherit'
                            style={{ marginLeft: 16 }}
                            type='title'
                        />
                    </Toolbar>
                </AppBar>

                <br/>

                <Typography
                    children='Por favor, escriba su correo electronico asociado a su cuenta para enviar los datos de inicio de sesion a su correo:'
                    type='subheading'
                />

                <TextField
                    label="Correo electronico"
                    fullWidth
                    value={ this.state.mail }
                    onChange={ this.handleChange }
                    margin="normal"
                    type='mail'
                />

                <Button
                    disabled={ this.state.mail.trim() === '' }
                    children='Enviar correo'
                    onClick={ this.handleRequest }
                    raised
                    style={{ width: '100%', marginBottom: 32 }}
                />

                <Typography
                    children={ this.state.text }
                    style={ this.state.response }
                    type='title'
                />
            </div>
        );
    }
}

export default Recovery;
