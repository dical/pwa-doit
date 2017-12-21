import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import DialogEvent from '../dialogs/event';

class ListEvents extends Component {
    state = {
        event: {
            open: false
        },
        events: [],
    };

    componentDidMount() {
        this.handleRequest(this.handleUpdate, '')
    }

    handleEvent = () => {
        this.setState({
            event: {
                open: !this.state.event.open
            }
        })
    };

    handleRequest = (callback, query) => {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://' + window.location.hostname + ':8081/events' + query, true);
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

    handleUpdate = (events) => {
        this.setState({
            events: JSON.parse(events)
        })
    };

    render() {
        return (
            <List style={{ padding: '64px 0' }}>
                {
                    this.state.events.map((event, index) => (
                        <Link
                            key={ index }
                            to={ '/event/' + event._id}
                        >
                            <ListItem button>
                                <Avatar src={ event.image }/>

                                <ListItemText
                                    primary={ event.name }
                                    secondary={ event.details !== '' ? event.details : 'No description' }
                                />

                                <Typography
                                    children={ time(event.start) }
                                    gutterBottom
                                    type="body2"
                                />
                            </ListItem>
                        </Link>
                    ))
                }


                <Button
                    fab
                    color="accent"
                    onClick={ this.handleEvent }
                    style={{position: 'fixed', right: 16, bottom: 72}}
                >
                    <Icon>add</Icon>
                </Button>

                <DialogEvent open={ this.state.event.open } onClose={ this.handleEvent } />
            </List>
        );
    }
}

function time(etime) {
    let start = new Date(etime),
        today = new Date(Date.now()),
        diff = (start.getTime() - today.getTime()) / 1000,
        end = ' seg';

    if (diff > 60 || diff < -60) {
        end = ' min';
        diff /= 60;
    }

    if (diff > 60 || diff < -60) {
        end = ' hr';
        diff /= 60
    }

    if (diff > 24 || diff < -24) {
        end = ' dia(s)';
        diff /= 24
    }

    if (diff > 365 || diff < -365) {
        end = ' año(s)';
        diff /= 365
    }

    if (diff > 0) {
        return 'Queda(n) '+diff.toFixed(0) + end
    } else {
        return 'Hace ' + (diff * -1).toFixed(0) + end
    }
}

export default ListEvents;