import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import Snack from '../snack';

import { request } from '../../helpers/request';
import { get_cookie } from "../../helpers/cookie";

class FormImage extends Component {
    state = {
        image: this.props.image,
        uploading: false,
        snack: {
            message: 'Subiendo imagen',
            open: false
        }
    };

    handleChange = (event) => {
        this.setState({ image: event.target.value })
    };

    handlePatch = () => {
        request('patch', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), { image: this.state.image }, this.props.update, true)
    };

    handleUpload = (event) => {
        this.setState({ uploading: true });

        let xhr = new XMLHttpRequest();
        let fdt = new FormData();
        let response = this.handleResponse;

        fdt.append('image', event.target.files[0]);

        xhr.open("POST", 'http://' + window.location.hostname + ':8081/images', true);

        xhr.onreadystatechange = function() { if (xhr.readyState === 4) { response(xhr) } };

        xhr.send(fdt);
    };

    handleResponse = (request) => {
        switch (request.status) {
            case 200:
                this.setState({ image: JSON.parse(request.response).image });
                this.handleSnack('Imagen subida');
                break;
            default:
                this.handleSnack('No se pudo subir la imagen');
                break;
        }

        this.setState({ uploading: false })
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                message: typeof message === 'string' ? message : this.state.snack.message,
                open: typeof message === 'string'
            }
        });
    };

    render() {
        return (
            <form>
                <fieldset disabled={ this.state.uploading } style={{ lineHeight: 1, padding: 0 }}>
                    <DialogTitle>{ 'Imagen de usuario' }</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            multiline
                            rowsMax={ 4 }
                            onChange={ this.handleChange }
                            placeholder='Dirección url'
                            value={ this.state.image }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={ () => { document.querySelector('form input[type="file"').click() } }
                        >
                            { this.state.uploading ? <CircularProgress size={ 15 }/> : 'Subir' }
                        </Button>

                        <Button
                            children='Actualizar'
                            color='primary'
                            onClick={ this.handlePatch }
                        />
                    </DialogActions>

                    <input type='file' hidden onChange={ this.handleUpload } accept="image/*"/>
                </fieldset>

                <Snack
                    close={ this.handleSnack }
                    message={ this.state.snack.message }
                    open={ this.state.snack.open }
                />
            </form>
        );
    }
}

export default FormImage;
