import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FormSession from './components/forms/session';

class Login extends Component {
    render() {
        return (
            <div className='padding-top-64'>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Link to='/'>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color='contrast'
                            />
                        </Link>

                        <Typography
                            children='Ingresar'
                            color='inherit'
                            style={{ marginLeft: 16 }}
                            type='title'
                        />
                    </Toolbar>
                </AppBar>

                <FormSession/>
            </div>
        );
    }
}

export default Login;
