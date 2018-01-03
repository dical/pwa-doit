import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FormImage from '../forms/image';
import FormPhrase from '../forms/phrase';
import ListAgreements from '../lists/agreements';

import { request } from '../../helpers/request';
import { get_cookie, quit_cookie } from '../../helpers/cookie';

class ListSettings extends Component {
    state = {
        agreement: {},
        hiring: false,
        image: false,
        phrase: false,
        user: {
            image: '',
            phrase: ''
        }
    };

    componentDidMount() {
        request('get', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), {}, this.handleResponse, true)
    }

    handleHire = () => {
        this.setState({ hiring: !this.state.hiring })
    };

    handleImage = () => {
        this.setState({ image: !this.state.image })
    };

    handlePhrase = () => {
        this.setState({ phrase: !this.state.phrase })
    };

    handleResponse = (request) => {
        switch (request.status) {
            case 200:
                this.handleUpdate(JSON.parse(request.response));
                break;
            default:
                this.handleSnack('Ajustes en mantenimiento.');
                break;
        }
    };

    handleSession = () => {
        ['userId', 'userRut'].forEach(quit_cookie); window.location.href = '/'
    };

    handleUpdate = (user) => {
        this.setState({ user: user })
    };

    render() {
        return (
            <List>
                <ListItem
                    button
                    onClick={ this.handleImage }
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
                    onClick={ this.handlePhrase }
                >
                    <ListItemText
                        primary='Frase'
                        secondary={ this.state.user.phrase }
                    />
                </ListItem>

                <ListItem
                    button
                    onClick={ this.handleHire }
                >
                    <ListItemText
                        primary='Cambiar plan'
                        secondary={ '' }
                    />
                </ListItem>

                <Divider />

                <ListItem
                    button
                    onClick={ this.handleSession }
                >
                    <ListItemText primary='Salir'/>
                </ListItem>

                <FormImage
                    close={ this.handleImage }
                    open={ this.state.image }
                />

                <FormPhrase
                    close={ this.handlePhrase }
                    open={ this.state.phrase }
                />

                <Dialog
                    classes={{ paper: 'padding-top-128' }}
                    fullScreen
                    open={ this.state.hiring }
                >
                    <AppBar position='fixed'>
                        <Toolbar>
                            <IconButton
                                children={ <Icon>close</Icon> }
                                color='contrast'
                                onClick={ this.handleHire }
                            />

                            <Typography
                                children='Planes'
                                color='inherit'
                                style={{ marginLeft: 16 }}
                                type='title'
                            />
                        </Toolbar>
                    </AppBar>

                    <ListAgreements onClick={ this.handleHire }/>
                </Dialog>
            </List>
        );
    }
}

export default ListSettings;