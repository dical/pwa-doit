import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListSettings from './components/listSettings';

class Settings extends Component {
    render() {
        return (
            <div style={{ paddingTop: 64 }}>
                <AppBar position='fixed'>
                    <div id='header-radial-gradient'/>

                    <Toolbar>
                        <Link to='/'>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color="contrast"
                            />
                        </Link>

                        <Typography
                            children='Settings'
                            color='inherit'
                            type='title'
                        />
                    </Toolbar>
                </AppBar>

                <ListSettings/>
            </div>
        );
    }
}

export default Settings;