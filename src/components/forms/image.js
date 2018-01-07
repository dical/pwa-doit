import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { request } from '../../helpers/request';
import { get_cookie } from "../../helpers/cookie";

class FormImage extends Component {
    state = { image: this.props.image };

    handleChange = (event) => {
        this.setState({ image: event.target.value })
    };

    handlePatch = () => {
        request('patch', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), { image: this.state.image }, this.props.update, true)
    };

    render() {
        return (
            <form>
                <DialogTitle>{ 'Imagen de usuario' }</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        onChange={ this.handleChange }
                        placeholder='Dirección url'
                        value={ this.state.image }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        children='Actualizar'
                        color='primary'
                        onClick={ this.handlePatch }
                    />
                </DialogActions>
            </form>
        );
    }
}

export default FormImage;
