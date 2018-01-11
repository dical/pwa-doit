import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
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
        request: {
            loading: false
        }
    };

    componentDidMount() {
        this.handleRequest('get', this.props.src, {}, this.handleResponse)
    }

    componentWillReceiveProps(props) {
        this.handleRequest('get', props.src, {}, this.handleResponse)
    }

    handleEvent = () => {
        this.setState({
            event: {
                open: !this.state.event.open
            }
        })
    };

    handleRequest = (type, url, body, callback) => {
        let request = new XMLHttpRequest();

        this.setState({ request: { loading: true } });

        request.open(type.toUpperCase(), url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) { callback(request) } };

        request.send(JSON.stringify(body))
    };

    handleResponse = (request) => {
        switch (request.status) {
            case 200:
                this.handleUpdate(JSON.parse(request.response));
                break;
            default:
                break;
        }
    };

    handleUpdate = (events) => {
        this.setState({
            events: this.props.map !== undefined ? events.map(this.props.map) : events,
            request: {
                loading: false
            }
        })
    };

    render() {
        return (
            <List>

                {
                    this.state.request.loading && <div style={{ padding: 16, textAlign: 'center' }}><CircularProgress/></div>
                }

                {
                    !this.state.request.loading && this.state.events.length === 0 &&
                    <ListItem style={{ marginTop: -8 }}>
                        <ListItemText align='center' primary='No se encontraron eventos.'/>
                    </ListItem>
                }

                {
                    this.state.events.map((event, index) => (
                        <Link
                            key={ index }
                            to={ '/event/' + event._id}
                        >
                            <ListItem
                                button
                                style={ this.state.events.length !== index + 1 ? { boxShadow: '#eee 64px 1px 0px' } : {} }
                            >
                                <Avatar
                                    classes={{ img: 'avatar' }}
                                    src={ event.image }
                                    style={{ height: 64, width: 64 }}
                                />

                                <ListItemText
                                    primary={ event.name }
                                    secondary={ event.details !== '' ? event.details : 'No description' }
                                />

                                <Typography
                                    children={ time(event.start) }
                                    gutterBottom
                                    style={{ position: 'absolute', right: 16, top: 16 }}
                                    type="caption"
                                />
                            </ListItem>
                        </Link>
                    ))
                }

                {
                    cookie('userRut') && this.props.action &&
                    <Button
                        fab
                        color="accent"
                        onClick={ this.handleEvent }
                        style={{position: 'fixed', right: 16, bottom: 72}}
                    >
                        <Icon>add</Icon>
                    </Button>
                }


                <DialogEvent open={ this.state.event.open } onClose={ this.handleEvent } />
            </List>
        );
    }
}

function cookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
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
