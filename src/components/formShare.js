import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Snack from './snackDefault'
import TextField from 'material-ui/TextField';

class FormShare extends Component {
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

    componentDidUpdate() {
        if (document.getElementById('href') !== null) {
            document.getElementById('href').select(); document.execCommand("Copy");
        }
    }

    handleSnack = () => {
        this.setState({
            snack: {
                open: !this.state.snack.open
            }
        })
    };

    render() {
        return (
            <Dialog
                open={ this.props.open }
                onRequestClose={ this.props.onClose }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ "Compartir" }</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete="off"
                        fullWidth
                        id="href"
                        multiline
                        rowsMax="4"
                        value={ window.location.href }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        color="primary"
                        onClick={ this.props.onClose }
                    >
                        Cancel
                    </Button>
                </DialogActions>

                <Snack
                    open={ this.state.snack.open }
                    message="Copiado al portapapeles"
                />
            </Dialog>
        );
    }
}

export default FormShare;