import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';

import { get_cookie } from '../../helpers/cookie';

class ListUsers extends Component {
    componentWillReceiveProps(props) {
        console.log(props)
    }

    handleDelete = (_id) => {
        this.handleRequest(
            'delete',
            'http://' + window.location.hostname + ':8081/inscriptions/' + _id,
            {},
            this.props.onRefresh
        )
    };

    handleRequest = (type, url, body, callback) => {
        let request = new XMLHttpRequest();

        request.open(type.toUpperCase(), url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) { callback(request) }
        };

        request.send(JSON.stringify(body));
    };

    render() {
        return (
            <List style={{ marginTop: 64 }}>
                {
                    this.props.dataUsers.length === 0 &&
                    <ListItem>
                        <ListItemText align='center' primary='No se encontraron usuarios.'/>
                    </ListItem>
                }

                {
                    this.props.dataUsers.map((user, i) => (
                        <ListItem key={ i } style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                            <Link
                                to={ '/user/' + user._id }
                                style={{ textDecoration:'none' }}
                            >
                                <Avatar
                                    classes={{ img: 'avatar' }}
                                    src={ user.image !== undefined ? user.image : '/images/user.png' }
                                />
                            </Link>

                            <ListItemText
                                classes={{ text:'overflow-text' }}
                                primary={ capitalizeFirstLetter(user.names) + ' ' + (user.hasOwnProperty('surnames') ? capitalizeFirstLetter(user.surnames) : '') }
                                secondary={ user.phrase }
                            />

                            {
                                user.event.own === get_cookie('userId') &&
                                <IconButton
                                    children={ <Icon>close</Icon> }
                                    onClick={ () => this.handleDelete( user.inscription ) }
                                />
                            }
                        </ListItem>
                    ))
                }
            </List>
        );
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ListUsers;