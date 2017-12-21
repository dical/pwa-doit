import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FormEvent from '../forms/event';

class DialogEvent extends Component {
    handleClick = () => {
        document.getElementById('create_event_button').click()
    };

    render() {
        return <Dialog
            fullScreen
            open={ this.props.open }
            transition={ <Slide direction='up'/> }
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
                        children='Create event'
                        color='inherit'
                        type='title'
                    />

                    <IconButton
                        children={ <Icon classes={{ root: 'bold' }}>check</Icon> }
                        color="accent"
                        onClick={ this.handleClick }
                        style={{ marginLeft: 'auto' }}
                    />
                </Toolbar>
            </AppBar>

            <FormEvent/>
        </Dialog>
    }
}

export default DialogEvent;