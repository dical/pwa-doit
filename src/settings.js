import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListSettings from './components/lists/settings';

class Settings extends Component {
    render() {
        return (
            <div style={{ paddingTop: 64 }}>
                <AppBar position='fixed' style={{ background: 'linear-gradient(90deg, #18252d 30%, #0a1014 90%)' }}>
                    <Toolbar>
                        <Link to={ '/user/' + cookie('userId') }>
                            <IconButton children={ <Icon>arrow_back</Icon> } color='contrast'/>
                        </Link>

                        <Typography children='Ajustes' color='inherit' style={{ marginLeft: 16 }} type='title'/>
                    </Toolbar>
                </AppBar>

                <ListSettings/>
            </div>
        );
    }
}

function cookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default Settings;