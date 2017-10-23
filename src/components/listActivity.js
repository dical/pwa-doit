import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class Activities extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Recientes';

        document.getElementById('header').style.backgroundColor = '';
        document.getElementById('header').style.boxShadow = '';
        document.getElementById('shell').style.padding = '64px 0';

        ['title', 'search', 'filter', 'down'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['back', 'settings', 'check', 'shared', 'edit'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        });

        if (getCookie('userRut') === '') {
            document.getElementById('add').style.display = 'none';
        }

        let request = new XMLHttpRequest(), onUpdate = this.handleUpdateData;

        request.open('GET', 'http://' + window.location.hostname + ':8081/events', true);

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        onUpdate(JSON.parse(request.response));
                        break;
                    default:
                        break;
                }
            }
        };

        request.send()
    };

    handleUpdateData = (data) => {
        this.setState({ data: data });
    };

    render() {
        return (
            <List>
                {this.state.data.map((event, i) => (
                    <Link key={this.state.data.length - i} to={'/activity/' + event._id} style={{textDecoration:'none'}}>
                        <ListItem button>
                            <Avatar src={'images/activity.jpg'} style={{height: 64, width: 64}}/>
                            <ListItemText classes={{text:'overflow-text'}} primary={event.name} secondary={event.details}/>
                            <Typography type="caption" style={{position: 'absolute', right: 16, top: 16}}>
                                {time(event.start)}
                            </Typography>
                        </ListItem>
                    </Link>
                ))}

                <Link id="add" to='/add' style={{textDecoration:'none'}}>
                    <Button fab color="accent" style={{position: 'fixed', right: 16, bottom: 72}}>
                        <Icon>add</Icon>
                    </Button>
                </Link>
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

export default Activities;
