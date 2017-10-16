import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText } from 'material-ui/List';

class Activities extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Recientes';

        document.getElementById('header').style.backgroundColor = '';
        document.getElementById('header').style.boxShadow = '';
        document.getElementById('shell').style.padding = '64px 0';

        document.getElementById('title').style.display = '';
        document.getElementById('search').style.display = '';
        document.getElementById('filter').style.display = '';
        document.getElementById('down').style.display = '';

        document.getElementById('back').style.display = 'none';
        document.getElementById('settings').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('shared').style.display = 'none';
        document.getElementById('edit').style.display = 'none';

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
                            <Avatar src={'images/activity.jpg'} style={{height: 72, width: 72, borderRadius: 0}}/>
                            <ListItemText classes={{text:'overflow-text'}} primary={event.name} secondary={"Disfruta de una clase asistida por un instructor en nuestra escuela, dos horas para conectarte con el mar en nuestra escuela ubicada en la avenida del mar"}/>
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
