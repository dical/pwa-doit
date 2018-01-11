import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import Snack from '../snack';

class FormMoment extends Component {
    state = {
        moment: {
            disable: false,
            error: false,
            value: ''
        },
        snack: {
            message: '',
            open: false
        }
    };

    handleChange = (event) => {
        this.setState({
            moment: {
                disable: false,
                error: false,
                value: event.target.value
            }
        })
    };

    handleDisable = () => {
        this.setState({
            moment: {
                disable: !this.state.moment.disable,
                error: this.state.moment.error,
                value: this.state.moment.value
            }
        })
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            disable = this.handleDisable,
            message = this.handleSnack,
            success = this.props.close;

        request.open('POST', 'http://' + window.location.hostname + ':8081/moments', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201: success();
                        break;
                    case 403: message("No se pudo agregar el momento");
                        break;
                    default : message("El servicio no responde");
                        break;
                }

                disable()
            }
        };

        disable();

        request.send(
            JSON.stringify({
                event: window.location.pathname.split('/').pop(),
                img: this.state.moment.value,
                user: getCookie('userId')
            })
        )
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                message: typeof message === 'string' ? message : '',
                open: !this.state.snack.open
            }
        })
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
                let moment = this.state.moment;

                moment.value = JSON.parse(request.response).image

                this.setState({ moment: moment });
                this.handleSnack('Imagen subida');
                break;
            default:
                this.handleSnack('No se pudo subir la imagen');
                break;
        }

        this.setState({ uploading: false })
    };

    render() {
        return (
            <Dialog
                open={ this.props.open }
                onClose={ this.props.close }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ 'Nuevo Momento' }</DialogTitle>
                <DialogContent>
                    <TextField
                        id="moment-source"
                        label="URL"
                        multiline
                        value={ this.state.moment.value }
                        onChange={ this.handleChange }
                        fullWidth
                    />

                    <input type='file' hidden onChange={ this.handleUpload } accept="image/*"/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={ () => { document.querySelector('input[type="file"').click() } }
                    >
                        { this.state.uploading ? <CircularProgress size={ 15 }/> : 'Subir' }
                    </Button>

                    <Button
                        autoFocus
                        color="primary"
                        disabled={ !(new RegExp("https?:\\/\\/.*\\.(?:png|jpg)")).test(this.state.moment.value) }
                        onClick={ this.handleRequest }
                    >
                        Agregar
                    </Button>
                </DialogActions>

                <Snack
                    open={ this.state.snack.open }
                    message={ this.state.snack.message }
                    close={ this.handleSnack }
                />
            </Dialog>
        );
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default FormMoment;