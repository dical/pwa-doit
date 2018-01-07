import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { request } from '../../helpers/request';
import { get_cookie } from "../../helpers/cookie";

class FormImage extends Component {
    state = { phrase: this.props.phrase };

    handleChange = (event) =>{
        this.setState({ phrase: event.target.value })
    };

    handlePatch = () => {
        request('patch', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), { phrase: this.state.phrase }, this.props.update, true)
    };

    render() {
        return (
            <form>
                <DialogTitle>{ 'Frase de usuario' }</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        onChange={ this.handleChange }
                        placeholder='Frase'
                        value={ this.state.phrase }
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