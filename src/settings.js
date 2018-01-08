import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListSettings from './components/lists/settings';

import { get_cookie } from './helpers/cookie';

class Settings extends Component {
    render() {
        return (
            <div className='padding-top-64'>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Link to={ '/user/' + get_cookie('userId') }>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color='contrast'
                            />
                        </Link>

                        <Typography
                            children='Ajustes'
                            color='inherit'
                            style={{ marginLeft: 16 }}
                            type='title'
                        />

                        <Link
                            to={ '/support' }
                            style={{ marginLeft: 'auto' }}
                        >
                            <IconButton
                                children={ <Icon>help</Icon> }
                                color='contrast'
                            />
                        </Link>
                    </Toolbar>
                </AppBar>

                <ListSettings/>
            </div>
        );
    }
}

export default Settings;
