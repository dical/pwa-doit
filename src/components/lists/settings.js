import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';

import FormImage from '../forms/image';
import FormPhrase from '../forms/phrase';
import FormAgreement from '../forms/agreement';

import { request } from '../../helpers/request';
import { get_cookie, quit_cookie } from '../../helpers/cookie';

class ListSettings extends Component {
    state = {
        dialog: null,
        user: {
            image: '',
            phrase: ''
        }
    };

    agreements = [
        'Basico',
        'Medio',
        'Pro'
    ];

    componentDidMount() {
        request('get', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), {}, this.handleResponse, true)
    }

    handleChange = (prop, value) => {
        let user = this.state.user; user[prop] = value; this.setState({ user: user })
    };

    handleDialog = (value) => {
        this.setState({ dialog: typeof value === "object" ? null : value })
    };

    handleResponse = (request) => {
        switch (request.status) {
            case 200:
                this.handleUpdate(JSON.parse(request.response));
                break;
            case 202:
                this.handleUpdate(JSON.parse(request.response));
                break;
            default:
                this.handleSnack('Ajustes en mantenimiento.');
                break;
        }
    };

    handleUpdate = (user) => {
        this.setState({
            dialog: null,
            user: user
        })
    };

    render() {
        return (
            <List>
                <ListItem
                    button
                    onClick={ () => { this.handleDialog('image') } }
                >
                    <Avatar
                        alt={ this.state.user.image }
                        classes={{ root: 'square', img: 'avatar' }}
                        src={ this.state.user.image }
                    />

                    <ListItemText
                        primary='Imagen de usuario'
                        secondary='Clic para modificar'
                    />
                </ListItem>

                <ListItem
                    button
                    onClick={ () => { this.handleDialog('phrase') } }
                >
                    <ListItemText
                        primary='Frase'
                        secondary={ this.state.user.phrase }
                    />
                </ListItem>

                {
                    get_cookie('userRut') &&
                    <ListItem
                        button
                        onClick={ () => { this.handleDialog('agreement') } }
                    >
                        <ListItemText
                            primary='Cambiar plan'
                            secondary={ this.agreements[this.state.user.agreement] }
                        />
                    </ListItem>
                }

                <Divider />

                <ListItem
                    button
                    onClick={ () => { ['userId', 'userRut'].forEach(quit_cookie); window.location.href = '/' } }
                >
                    <ListItemText primary='Salir'/>
                </ListItem>

                <Dialog
                    classes={{ paper: 'w-80' }}
                    onClose={ this.handleDialog }
                    open={ this.state.dialog !== null }
                >
                    {
                        this.state.dialog === 'image' &&
                        <FormImage
                            image={ this.state.user.image }
                            update={ this.handleResponse }
                        />
                    }

                    {
                        this.state.dialog === 'phrase' &&
                        <FormPhrase
                            phrase={ this.state.user.phrase }
                            update={ this.handleResponse }
                        />
                    }

                    {
                        this.state.dialog === 'agreement' &&
                        <FormAgreement
                            agreement={ this.state.user.agreement }
                            update={ this.handleResponse }
                        />
                    }
                </Dialog>
            </List>
        );
    }
}

export default ListSettings;