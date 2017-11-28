import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Snack from './snackDefault'
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

class FormComment extends Component {
    state = {
        comment: {
            disable: false,
            error: false,
            value: ''
        },
        snack: {
            message: '',
            open: false
        },
        user: {}
    };

    handleChange = (event) => {
        this.setState({
            comment: {
                disable: false,
                error: false,
                value: event.target.value
            }
        })
    };

    handleDisable = () => {
        this.setState({
            comment: {
                disable: !this.state.comment.disable,
                error: this.state.comment.error,
                value: this.state.comment.value
            }
        })
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            finales = this.props.onClose,
            disable = this.handleDisable,
            message = this.handleSnack,
            success = this.props.onSuccess;

        request.open('POST', 'http://' + window.location.hostname + ':8081/messages', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201:
                        success(); finales();
                        break;
                    case 403:
                        message('Caracteres no permitidos');
                        break;
                    case 500:
                        message('El servicio no responde');
                        break;
                    default:
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
                type: 'comment',
                details: this.state.comment.value
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
                onRequestClose={ this.props.onClose }
                classes={{ paper: 'w-80' }}
                fullScreen
                transition={<Slide direction="up"/>}
                style={{
                    position: 'absolute',
                    height: 'auto',
                    bottom: 0,
                    top: 'auto'
                }}
            >
                <List style={{ padding: 0 }}>
                    <ListItem>
                        <Avatar src={ this.props.avatar }/>

                        <ListItemText
                            primary={
                                <TextField
                                    autoFocus
                                    autoComplete="off"
                                    disabled={ this.state.comment.disable }
                                    fullWidth
                                    multiline
                                    onChange={ this.handleChange }
                                    placeholder="Agregar un comentario..."
                                    rowsMax="4"
                                    value={ this.state.comment.value }
                                    style={{ marginRight: 16 }}
                                />
                            }
                        />

                        {
                            this.state.comment.value !== '' &&
                            <ListItemSecondaryAction
                                children={
                                    <IconButton onClick={ this.handleRequest }>
                                        <Icon>send</Icon>
                                    </IconButton>
                                }
                            />
                        }
                    </ListItem>
                </List>

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

export default FormComment;