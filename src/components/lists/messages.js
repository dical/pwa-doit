import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

class ListMessages extends Component {
    state = {
        messages: []
    };

    icons = {
        activity: 'directions_run',
        comment: 'comment',
        notify: 'notification'
    };

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = () => {
        this.handleRequest(this.handleUpdate)
    };

    handleRequest = (callback) => {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://' + window.location.hostname + ':8081/messages?' + this.props.query, true);
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
        this.setState({ messages: JSON.parse(response).reverse() })
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
                    this.state.messages.map((message, index) => (
                        <Link
                            children={
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon children={ this.icons[message.type] }/>
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={ message.details }
                                        secondary={ message.event.name }
                                    />
                                </ListItem>
                            }
                            key={ this.state.messages.length - index }
                            to={ '/event/' + message.event._id }
                        />
                    ))
                }
            </List>
        );
    }
}

export default ListMessages;