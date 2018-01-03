import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Welcome extends Component {
    render() {
        return (
            <div>
                <AppBar
                    elevation={ 0 }
                    position='fixed'
                >
                    <Toolbar>
                        <Typography
                            children='Bienvenido'
                            color='inherit'
                            type='title'
                            style={{ marginLeft: 16 }}
                        />
                    </Toolbar>
                </AppBar>

                <div className='padding-top-64 text-align-center background-default height-fill-available'>
                    <img
                        alt=''
                        src={ '/images/logo.png' }
                        style={{ width: '50vw', maxWidth: 'fit-content' }}
                    />

                    <Typography
                        align='center'
                        children='Comienza la revolución para motivar al mundo'
                        type='headline'
                        style={{ color: '#fff', marginBottom: 26 }}
                    />

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
