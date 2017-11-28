import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Snack from './snackDefault'
import TextField from 'material-ui/TextField';

class FormImage extends Component {
    state = {
        snack: {
            message: '',
            open: false
        }
    };

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
                onRequestClose={ this.props.onRequestClose }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ "Imagen de usuario" }</DialogTitle>
                <DialogContent>
                    <TextField
                        id="image"
                        label="Direccion url"
                        multiline
                        value={ this.props.value }
                        onChange={ this.props.onChange }
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={ this.props.onDefaultClick }
                        color="default"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={ this.props.onPrimaryClick }
                        color="primary"
                        autoFocus
                    >
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default FormImage;