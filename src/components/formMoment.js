import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Snack from './snackDefault';
import TextField from 'material-ui/TextField';

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
            success = this.props.onRequestClose;

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

    render() {
        return (
            <Dialog
                open={ this.props.open }
                onRequestClose={ this.props.onRequestClose }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ "New Moment" }</DialogTitle>
                <DialogContent>
                    <TextField
                        id="moment-source"
                        label="URL"
                        multiline
                        value={ this.state.moment.value }
                        onChange={ this.handleChange }
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={ this.props.onRequestClose }
                        color="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        color="primary"
                        disabled={ !(new RegExp("https?:\\/\\/.*\\.(?:png|jpg)")).test(this.state.moment.value) }
                        onClick={ this.handleRequest }
                    >
                        Add
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