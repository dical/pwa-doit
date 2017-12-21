import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListCategories from '../lists/categories'

class DialogCategories extends Component {
    render() {
        return <Dialog
            fullScreen
            open={ this.props.open }
            transition={ <Slide direction='down'/> }
        >
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton
                        children={ <Icon>close</Icon> }
                        color="contrast"
                        onClick={ this.props.onClose }
                    />

                    <Typography
                        children='Select category'
                        color='inherit'
                        type='title'
                    />
                </Toolbar>
            </AppBar>

            <ListCategories/>
        </Dialog>
    }
}

export default DialogCategories;