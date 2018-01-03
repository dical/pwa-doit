import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListUsers from '../lists/users'

class DialogUsers extends Component {
    render() {
        return <Dialog
            fullScreen
            open={ this.props.open }
        >
            <AppBar position='fixed' style={{ background: 'linear-gradient(90deg, #18252d 30%, #0a1014 90%)' }}>
                <Toolbar>
                    <IconButton
                        children={ <Icon>close</Icon> }
                        color="contrast"
                        onClick={ this.props.onClose }
                    />

                    <Typography
                        children='Inscritos'
                        color='inherit'
                        type='title'
                    />
                </Toolbar>
            </AppBar>

            <ListUsers dataUsers={ this.props.dataUsers } onRefresh={ this.props.onRefresh }/>
        </Dialog>
    }
}

export default DialogUsers;