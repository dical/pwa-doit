import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListUsers from '../lists/users'

class DialogUsers extends Component {
    render() {
        return <Dialog
            fullScreen
            open={ this.props.open }
            transition={ <Slide direction='down'/> }
        >
            <AppBar position='fixed'>
                <div className='header-radial-gradient'/>

                <Toolbar>
                    <IconButton
                        children={ <Icon>close</Icon> }
                        color="contrast"
                        onClick={ this.props.onClose }
                    />

                    <Typography
                        children='List of users'
                        color='inherit'
                        type='title'
                    />
                </Toolbar>
            </AppBar>

            <ListUsers users={ this.props.users }/>
        </Dialog>
    }
}

export default DialogUsers;