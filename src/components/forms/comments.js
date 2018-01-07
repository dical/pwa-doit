import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import Snack from '../snack';

class FormComments extends Component {
    state = {
        disabled: false,
        value: this.props.value,
        snack: {
            message: '',
            open: false
        },
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    };

    handleDisable = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            disable = this.handleDisable,
            message = this.handleSnack,
            success = this.handleSuccess;

        request.open('POST', 'http://' + window.location.hostname + ':8081/messages', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201:
                        success(request.response);
                        break;
                    case 403:
                        message('Characters not allowed');
                        break;
                    default: message('Service not respond');
                        break;
                }

                disable()
            }
        };

        disable();

        request.send(
            JSON.stringify({
                user: getCookie('userId'),
                event: window.location.pathname.split('/').pop(),
                details: this.state.value,
                to: this.props.message._id
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

    handleSuccess = () =>{
        this.props.onSuccess();
        this.props.onClose()
    };

    render() {
        return <Dialog
            classes={{ paper: 'w-80' }}
            open={ this.props.open }
            onClose={ this.props.onClose }
        >
            <DialogTitle children={ this.props.message === undefined ? 'Add comment' : 'Respond to ' + this.props.message.user.username }/>

            <DialogContent>
                <TextField
                    autoFocus
                    autoComplete='off'
                    disabled={ this.state.disabled }
                    fullWidth
                    multiline
                    onChange={ this.handleChange }
                    placeholder='Write comment...'
                    rowsMax='4'
                    value={ this.state.value }
                />
            </DialogContent>

            <DialogActions>
                <Button
                    color="default"
                    onClick={ this.props.onClose }
                >
                    Cancel
                </Button>

                <Button
                    autoFocus
                    color="primary"
                    onClick={ this.handleRequest }
                >
                    { this.props.message === undefined ? 'Add' : 'Respond' }
                </Button>
            </DialogActions>

            <Snack
                open={ this.state.snack.open }
                message={ this.state.snack.message }
                close={ this.handleSnack }
            />
        </Dialog>
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default FormComments;