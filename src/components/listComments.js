import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class ListComments extends Component {
    state = {
        messages: []
    };

    componentDidMount() {
        if (this.props.hasOwnProperty('filter') && this.props.filter.hasOwnProperty('user')) {
            document.getElementById('title').innerText = 'Mensajes';

            document.getElementById('header').classList.remove('transparent');
            document.getElementById('shell').style.padding = '64px 0';

            ['back', 'title'].forEach(function(id) {
                document.getElementById(id).style.display = ''
            });

            ['settings', 'shared', 'edit', 'filter', 'down', 'search', 'bottom-navigation'].forEach(function(id) {
                document.getElementById(id).style.display = 'none'
            });
        }

        this.handleRequest(this.handleUpdate)
    }

    decodeQuery = (objQuery) => {
        let str = '';

        for (let p in objQuery) {
            if (objQuery.hasOwnProperty(p)) {
                str += p + '=' + objQuery[p] + '&';
            }
        }

        return str;
    };

    handleRequest = (update) => {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://' + window.location.hostname + ':8081/messages?' + this.decodeQuery(this.props.query), true);
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

        request.send()
    };

    handleUpdate = (data) => {
        this.setState({
            messages: data.reverse()
        })
    };

    render() {
        return (
            <List
                style={{
                    position: 'absolute',
                    width: '-webkit-fill-available',
                    height: 'calc(100% - 250px - 90px - 48px - 16px)',
                    overflowY: 'scroll'
                }}
            >
                {
                    this.state.messages.map((message, i) => (
                        <ListItem button>
                            <Link
                                key={ this.state.messages.length - i }
                                to={ '/user/' + message.user._id }
                                style={{ textDecoration:'none' }}
                            >
                                <Avatar
                                    src={ message.user.image === '/images/landscape.jpg' ? '/images/user.png' : message.user.image }
                                    style={{
                                        border: '2px solid black'
                                    }}
                                />
                            </Link>

                            <ListItemText
                                classes={{ text: 'overflow-text comment' }}
                                secondary={ message.user.username + ' • ' + getDiffDate(message.date) }
                                primary={ message.details }
                            />

                            <Typography
                                gutterBottom
                                type="caption"
                                style={{
                                    position: 'absolute',
                                    right: 16,
                                    top: 16
                                }}
                            >
                                {  }
                            </Typography>

                            <ListItemSecondaryAction>
                                <IconButton aria-label="Comments">
                                    <Icon>message</Icon>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        );
    }
}

function getDiffDate(date) {
    let diff = ((new Date(Date.now())).getTime() - (new Date(date)).getTime()) / 1000,
        text = ' segundo';

    if (diff > 59) {
        text = ' minuto';
        diff /= 60;
    }

    if (diff > 59 && text === ' minuto') {
        text = ' hora';
        diff /= 60;
    }

    if (diff > 23 && text === ' hora') {
        text = ' dia';
        diff /= 24;
    }

    if (diff.toFixed(0) > 1) {
        text = text + 's'
    }

    return 'Hace ' + diff.toFixed(0) + text
}

export default ListComments;