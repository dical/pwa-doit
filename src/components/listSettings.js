import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField'

class Settings extends Component {
    state = {
        image: {
            open: false,
            value: ''
        },
        phrase: {
            open: false,
            value: ''
        }
    };

    handleLogout = () => {
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "userRut=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.getElementById('login').click()
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Ajustes';

        document.getElementById('header').classList.remove('transparent');
        document.getElementById('shell').style.padding = '64px 0';

        ['back', 'title'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['settings', 'shared', 'edit', 'filter', 'down', 'search', 'bottom-navigation'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        });

        this.handleRequest('get', 'http://' + window.location.hostname + ':8081/users/' + getCookie('userId'), this.handleUpdateSettings, true)
    }

    handleDialogImage = () => {
        this.setState({
            image: {
                open: !this.state.image.open,
                value: this.state.image.value
            }
        })
    };

    handleCheckImage = (event) => {
        this.setState({
            image: {
                open: true,
                value: event.target.hasOwnProperty('value') ? event.target.value : this.state.image.value
            }
        })
    };

    handleDialogPhrase = () => {
        this.setState({
            phrase: {
                open: !this.state.phrase.open,
                value: this.state.phrase.value
            }
        })
    };

    handleCheckPhrase= (event) => {
        this.setState({
            phrase: {
                open: true,
                value: event.target.hasOwnProperty('value') ? event.target.value : this.state.phrase.value
            }
        })
    };

    handleUpdateSettings = (data) => {
        this.setState({
            image: {
                open: false,
                value: data.image
            },
            phrase: {
                open: false,
                value: data.phrase
            }
        })
    };

    handleRequest = (type, url, update, async) => {
        let request = new XMLHttpRequest(), body = {};

        request.open(type.toUpperCase(), url, async);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        update(JSON.parse(request.response));
                        break;
                    default:
                        break;
                }
            }
        };

        if (type.toLowerCase() === 'patch') {
            body = {
                image: this.state.image.value,
                phrase: this.state.phrase.value
            }
        }

        request.send(JSON.stringify(body))
    };

    handleRequestImage = () => {
        this.handleRequest('patch', 'http://' + window.location.hostname + ':8081/users/' + getCookie('userId'), this.handleUpdateSettings, true);
    };

    handleRequestPhrase = () => {
        this.handleRequest('patch', 'http://' + window.location.hostname + ':8081/users/' + getCookie('userId'), this.handleUpdateSettings, true);
    };

    render() {
        return (
            <List>
                <ListItem button>
                    <ListItemText
                        onClick={ this.handleDialogImage }
                        primary="Imagen"
                        secondary={ this.state.image.value }
                    />
                </ListItem>

                <ListItem button>
                    <ListItemText
                        onClick={ this.handleDialogPhrase }
                        primary="Frase"
                        secondary={ this.state.phrase.value }
                    />
                </ListItem>

                <Divider />

                <ListItem
                    button
                    onClick={ this.props.action }
                >
                    <ListItemText
                        primary="Salir"
                        style={{ paddingRight: 62 }}
                        onClick={ this.handleLogout }
                    />
                </ListItem>

                <Dialog
                    open={ this.state.image.open }
                    onRequestClose={ this.handleDialogImage }
                    classes={{ paper: 'w-80' }}
                >
                    <DialogTitle>{ "Imagen de usuario" }</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="image"
                            label="Imagen"
                            value={ this.state.image.value }
                            onChange={ this.handleCheckImage }
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={ this.handleDialogImage }
                            color="primary"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={ this.handleRequestImage }
                            color="primary"
                            autoFocus
                        >
                            Actualizar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={ this.state.phrase.open }
                    onRequestClose={ this.handleDialogPhrase }
                    classes={{ paper: 'w-80' }}
                >
                    <DialogTitle>{ "Frase de usuario" }</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="phrase"
                            label="Frase"
                            value={ this.state.phrase.value }
                            onChange={ this.handleCheckPhrase }
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={ this.handleDialogPhrase }
                            color="primary"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={ this.handleRequestPhrase }
                            color="primary"
                            autoFocus
                        >
                            Actualizar
                        </Button>
                    </DialogActions>
                </Dialog>
            </List>
        );
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default Settings;