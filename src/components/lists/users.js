import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';

class ListUsers extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        this.handleRequest(this.handleUpdate)
    }

    handleRequest = (callback) => {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://' + window.location.hostname + ':8081/users?ids=' + this.props.users.join(','), true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        callback(request.response);
                        break;
                    default:
                        break;
                }
            }
        };

        request.send()
    };

    handleUpdate = (response) => {
        this.setState({
            users: JSON.parse(response)
        })
    };

    render() {
        return (
            <List style={{ marginTop: 64 }}>
                {
                    this.state.users.map((user, i) => (
                        <Link
                            key={ this.state.users.length - i }
                            to={ '/user/' + user._id }
                            style={{ textDecoration:'none' }}
                        >
                            <ListItem button>
                                <Avatar src={ user.image !== undefined ? user.image : '/images/user.png' }/>

                                <ListItemText
                                    classes={{ text:'overflow-text' }}
                                    primary={ user.names + ' ' + user.surnames }
                                    secondary={ '@' + user.username }
                                />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        );
    }
}

export default ListUsers;