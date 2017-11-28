import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

class ListUsers extends Component {
    state = {
        users: []
    };

    componentWillReceiveProps() {
        this.handleRequest()
    }

    handleRequest = () => {
        let request = new XMLHttpRequest(), onUpdate = this.handleUpdate;

        request.open('GET', 'http://' + window.location.hostname + ':8081/users?ids=' + this.props.list.join(','), true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

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

    handleUpdate = (data) => {
        this.setState({
            users: data
        })
    };

    render() {
        return (
            <Dialog
                fullScreen
                open={ this.props.open }
                transition={<Slide direction="up"/>}
            >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" onClick={ this.props.onRequestClose } style={{ margin: '0 12px 0 -12px' }}>
                            <Icon>close</Icon>
                        </IconButton>
                        <Typography type="title" color="inherit">
                            Participantes
                        </Typography>
                    </Toolbar>
                </AppBar>

                <List>
                    {
                        this.state.users.map((user, i) => (
                            <Link
                                key={ this.state.users.length - i }
                                to={ '/user/' + user._id }
                                style={{ textDecoration:'none' }}
                            >
                                <ListItem button>
                                    <Avatar
                                        src={ user.image === '/images/landscape.jpg' ? '/images/user.png' : user.image }
                                        style={{ border: '2px solid black' }}
                                    />

                                    <ListItemText
                                        classes={{ text:'overflow-text' }}
                                        primary={ user.names }
                                        secondary={ '@' + user.username }
                                    />
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </Dialog>
        );
    }
}

export default ListUsers;