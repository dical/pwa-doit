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
            <div style={{ textAlign: 'center' }}>
                <AppBar elevation={ 0 } position='fixed' style={{ background: 'transparent' }}>
                    <Toolbar>
                        <Typography children='Bienvenido' color='inherit' type='title' style={{ marginLeft: 16 }}/>

                        <Link to='/login' style={{ marginLeft: 'auto' }}>
                            <IconButton color="contrast">
                                <Icon>info</Icon>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: ' 64px 16px', background: 'linear-gradient(45deg, #18252d 30%, #0a1014 90%)', height: '-webkit-fill-available' }}>
                    <img src={ '/images/logo.png' } style={{ width: '50vw', maxWidth: 'fit-content' }}/>

                    <Typography align='center' children='Comienza la revolución para motivar al mundo' type='headline' style={{ color: '#fff', marginBottom: 26 }}/>

                    <Link to='/sign-in'>
                        <Button color="primary" raised>
                            registrate
                        </Button>
                    </Link>

                    &nbsp;&nbsp;

                    <Link to='/login'>
                        <Button color="primary" raised>
                            inicia sesión
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Welcome;