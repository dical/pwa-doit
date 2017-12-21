import React, { Component } from 'react';


import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

class FormRank extends Component {
    state = {
        comment: {
            disable: false,
            error: false,
            value: ''
        },
        snack: {
            open: true
        }
    };

    render() {
        return (
            <Dialog
                open={ this.props.open }
                onRequestClose={ this.props.onClose }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ "Rank" }</DialogTitle>

                <DialogContent>
                    <IconButton
                        children={ <Icon children='star'/> }
                        onClick={ this.props.onClose }
                    />
                    <IconButton
                        children={ <Icon children='star'/> }
                        onClick={ this.props.onClose }
                    />
                    <IconButton
                        children={ <Icon children='star'/> }
                        onClick={ this.props.onClose }
                    />
                    <IconButton
                        children={ <Icon children='star'/> }
                        onClick={ this.props.onClose }
                    />
                    <IconButton
                        children={ <Icon children='star'/> }
                        onClick={ this.props.onClose }
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

export default FormRank;