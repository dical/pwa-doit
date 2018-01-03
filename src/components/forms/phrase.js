import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { request} from '../../helpers/request';
import { get_cookie } from "../../helpers/cookie";

class FormImage extends Component {
    state = {
        user: {}
    };

    componentDidMount() {
        request('get', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), {}, this.handleUpdate, true)
    }

    handleChange = (event) =>{
        let user = this.state.user; user.phrase = event.target.value;

        this.setState({ user: user })
    };

    handleUpdate = (request) => {
        switch (request.status) {
            case 200:
                this.setState({ user: JSON.parse(request.response) });
                break;
            case 202:
                window.location.reload();
                break;
            default:
                this.handleSnack('Modificar frase en mantenimiento.');
                break;
        }
    };

    render() {
        return (
            <Dialog
                open={ this.props.open }
                onClose={ this.props.close }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ 'Frase de usuario' }</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        onChange={ this.handleChange }
                        placeholder='Frase'
                        value={ this.state.user.phrase }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        children='Cancelar'
                        onClick={ this.props.close }
                    />

                    <Button
                        children='Actualizar'
                        color='primary'
                        onClick={ () => { request('patch', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), { phrase: this.state.user.phrase }, this.handleUpdate, true) } }
                    />
                </DialogActions>
            </Dialog>
        );
    }
}

export default FormImage;