import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FormSession from './components/forms/session';

class Login extends Component {
    state = {
        tabs: {
            value: 0
        },
        _id: ''
    };

    handleClick = () => {
        if (document.querySelector('form button') !== null) {
            document.querySelector('form button').click()
        }
    };

    handleSession = (response) => {
        let expires = new Date();

        expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));

        document.cookie = "userId=" + JSON.parse(response)._id + ";expires="+ expires.toUTCString() +";path=/";

        if (JSON.parse(response).hasOwnProperty('business')) {
            document.cookie = "userRut=" + JSON.parse(response).business.rut.body + ";expires="+ expires.toUTCString() +";path=/";
        }

        this.setState({
            _id: JSON.parse(response)._id
        }, function() {
            window.location.href = '/'
        })
    };

    render() {
        return (
            <div
                id='login'
                style={{ marginTop: 72 }}
            >
                <AppBar position='fixed' style={{ background: 'linear-gradient(90deg, #18252d 30%, #0a1014 90%)' }}>
                    <Toolbar>
                        <Link to='/'>
                            <IconButton children={ <Icon>arrow_back</Icon> } color='contrast'/>
                        </Link>

                        <Typography children='Ingresar' color='inherit' style={{ marginLeft: 16 }} type='title'/>
                        <IconButton children={ <Icon>check</Icon> } color='contrast' onClick={ this.handleClick } style={{ background: 'rgba(255, 255, 255, .26)', marginLeft: 'auto' }}/>
                    </Toolbar>
                </AppBar>

                <FormSession onRequestSucess={ this.handleSession }/>

                <Link id='to-user' to={ '/user/' + this.state._id }/>
            </div>
        );
    }
}

export default Login;