import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';

import FormImage from './formImage';

class Settings extends Component {
    state = {
        image: {
            open: false,
            value: ''
        },
        phrase: {
            open: false,
            value: ''
        },
        menu: {
            value: 1
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

    handleImage = () => {
        this.setState({
            image: {
                open: !this.state.image.open,
                value: this.state.image.value
            }
        })
    };

    handleCheckImage = (event) => {
        console.log(event);

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

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ menu: { value: index }, open: false });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const options = [
            'Plan 0',
            'Plan 1',
            'Plan 2',
            'Plan 3',
        ];

        return (
            <List>
                <ListItem button>
                    <ListItemText
                        onClick={ this.handleImage }
                        primary="Imagen de usuario"
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

                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Plan"
                    onClick={this.handleClickListItem}
                >
                    <ListItemText
                        primary="Plan seleccionado"
                        secondary={options[this.state.menu.value]}
                    />
                </ListItem>

                <Menu
                    id="lock-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 0}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>

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

                <FormImage
                    onChange={ this.handleCheckImage }
                    onDefaultClick={ this.handleImage }
                    onPrimaryClick={ this.handleRequestImage }
                    onRequestClose={ this.handleImage }
                    open={ this.state.image.open }
                    value={ this.state.image.value }
                />

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

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default Settings;