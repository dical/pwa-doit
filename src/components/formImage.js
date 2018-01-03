import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class FormImage extends Component {


    render() {
        return (
            <Dialog
                open={ this.props.open }
                onClose={ this.props.close }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ 'Imagen de usuario' }</DialogTitle>
                <DialogContent>
                    <TextField
                        id='image'
                        label='Direccion url'
                        multiline
                        value={ '' }
                        onChange={ null }
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={ this.props.close }
                        color="default"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={ this.handleRequest }
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