import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';

class Comments extends Component {
    state = {
        messages: []
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Mensajes';

        document.getElementById('header').classList.remove('transparent');
        document.getElementById('shell').style.padding = '64px 0';

        ['back', 'title'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['settings', 'shared', 'edit', 'filter', 'down', 'search', 'bottom-navigation'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        });

        this.handleRequest(this.handleUpdate)
    }

    handleRequest = (update) => {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://' + window.location.hostname + ':8081/messages?user=' + getCookie('userId'), true);
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
            messages: data
        })
    };

    render() {
        return (
            <List>
                {
                    this.state.messages.map((message, i) => (
                        <Link
                            key={ this.state.messages.length - i }
                            to={ '/user/' + message.user._id }
                            style={{ textDecoration:'none' }}
                        >
                            <ListItem button>
                                <Avatar
                                    src={ message.user.image === '/images/landscape.jpg' ? '/images/user.png' : message.user.image }
                                    style={{
                                        height: 64,
                                        width: 64,
                                        border: '2px solid black'
                                    }}
                                />

                                <ListItemText
                                    classes={{ text:'overflow-text' }}
                                    primary={ message.user.names + ' - ' + message.event.name  }
                                    secondary={ message.details }
                                />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        );
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default Comments;