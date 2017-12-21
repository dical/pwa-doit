import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Welcome extends Component {
    render() {
        return (
            <div id='page'>
                <AppBar position='fixed'>
                    <div id='header-radial-gradient'/>

                    <Toolbar>
                        <Typography
                            children='Welcome'
                            color='inherit'
                            type='title'
                        />

                        <Link
                            to='/login'
                            style={{ marginLeft: 'auto' }}
                        >
                            <IconButton
                                children={ <Icon>person</Icon> }
                                color="contrast"
                            />
                        </Link>
                    </Toolbar>
                </AppBar>

                <div id='block'>
                    <img
                        src={ '/images/logo.png' }
                        style={{
                            width: '70vw',
                            maxWidth: 'fit-content'
                        }}
                    />

                    <Typography
                        align='center'
                        children='Comienza la revolucion pra motivar al mundo'
                        type='display2'
                    />

                    <Typography
                        align='center'
                        children='Bienvenido a Doit Exp'
                        type='display1'
                    />

                    <br/>

                    <Link to='/sign-in'>
                        <Button
                            children='Sign In'
                            color="primary"
                            raised
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Welcome;