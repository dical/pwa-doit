import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

import { request } from '../../helpers/request';

class ListNotifications extends Component {
    state = { notifications: [] };

    icons = {
        owner_comment: 'notification',
        new_inscription: 'person_add'
    };

    componentWillReceiveProps(nextProps) {
        request('get', 'http://' + window.location.hostname + ':8081/notifications' + nextProps.query, {}, this.handleUpdate, true)
    }

    handleUpdate = (request) => {
        switch (request.status) {
            case 200:
                this.setState({ notifications: JSON.parse(request.response).reverse() });
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <List
                style={{
                    maxHeight: 'calc(100vh - 48px - 32px - 32px)',
                    overflowY: 'auto',
                    padding: 0
                }}
            >
                {
                    this.state.notifications.length === 0 &&
                    <ListItem children={ <ListItemText align='center' primary={ 'No se encontraron notificaciones.' }/> }/>
                }

                {
                    this.state.notifications.map((notification, index) => (
                        <Link
                            children={
                                <ListItem button>
                                    <ListItemIcon children={ <Icon children={ this.icons[notification.activity] }/> }/>
                                    <ListItemText primary={ notification.details }/>
                                </ListItem>
                            }
                            key={ index }
                            to={ '/event/' + notification.event._id }
                        />
                    ))
                }
            </List>
        );
    }
}

export default ListNotifications;
