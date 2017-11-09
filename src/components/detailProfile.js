import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { CardMedia } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

class Profile extends Component {
    state = {
        activities: [],
        comments: [],
        image: '',
        names: '',
        phrase: '',
        surnames: '',
        tabs: {
            value: 0
        },
        username: ''
    };

    componentDidMount() {
        document.getElementById('header').classList.add('transparent');
        document.getElementById('shell').style.padding = 0;

        ['back', 'settings'].forEach(function(e) {
            document.getElementById(e).style.display = ''
        });

        ['title', 'search', 'filter', 'down', 'shared', 'edit', 'bottom-navigation'].forEach(function(e) {
            document.getElementById(e).style.display = 'none'
        });

        if (document.cookie.indexOf(window.location.pathname.split('/').pop()) < 0) {
            document.getElementById('settings').style.display = 'none'
        }

        this.handleRequest('get', 'http://' + window.location.hostname + ':8081/events?users=' + window.location.pathname.split('/').pop(), this.handleUpdateActivities, true);
        this.handleRequest('get', 'http://' + window.location.hostname + ':8081/messages?user=' + window.location.pathname.split('/').pop(), this.handleUpdateComments, true);
        this.handleRequest('get', 'http://' + window.location.hostname + ':8081/users/' + window.location.pathname.split('/').pop(), this.handleUpdateUser, true)
    }

    handleChange = (event, data) => {
        this.setState({
            tabs: {
                value: data
            }
        })
    };

    handleRequest = (type, url, update, async) => {
        let request = new XMLHttpRequest();

        request.open(type.toUpperCase(), url, async);
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

    handleUpdateActivities = (data) => {
        this.setState({
            activities: data
        })
    };

    handleUpdateComments = (data) => {
        this.setState({
            comments: data
        })
    };

    handleUpdateUser = (data) => {
        this.setState({
            names: data.names,
            image: data.image,
            surnames: data.surnames,
            username: data.username,
            phrase: data.phrase
        })
    };

    render() {
        return (
            <div>
                <CardMedia
                    image={ this.state.image }
                    title="Contemplative Reptile"
                >
                    <Typography
                        type="display1"
                        style={{
                            color: '#fafafa',
                            padding: '160px 16px 0',
                            textShadow: 'rgba(0,0,0,.18) 1px 1px'
                        }}
                    >
                        { this.state.names } { this.state.surnames }
                    </Typography>

                    <Typography
                        type="subheading"
                        style={{
                            color: '#fafafa',
                            padding: '0 16px 26px',
                            textShadow: 'rgba(0,0,0,.18) 1px 1px'
                        }}
                    >
                        @{ this.state.username }
                    </Typography>
                </CardMedia>

                <Button
                    fab
                    color="accent"
                    style={{
                        color: '#fff',
                        margin: '-28px 0 0',
                        position: 'absolute',
                        right: 16,
                        lineHeight: 0.25
                    }}
                >
                    <Icon>star</Icon>
                    <Icon
                        style={{
                            position: 'absolute',
                            left: 5,
                            top: 15,
                            maxHeight: 8,
                            overflow: 'hidden',
                            color: '#bbb',
                            fontSize: 26
                        }}
                    >
                        star
                    </Icon>
                    4.6
                </Button>

                <Typography
                    type="body1"
                    style={{
                        backgroundColor: '#0D47A1',
                        color: '#fafafa',
                        padding: '16px 56px 22px 16px',
                        fontStyle: 'italic'
                    }}
                >
                    <Icon>format_quote</Icon> { this.state.phrase }
                </Typography>

                <Tabs
                    value={ this.state.tabs.value }
                    onChange={ this.handleChange }
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                >
                    <Tab
                        icon={
                            <span>
                                <Icon
                                    style={{
                                        verticalAlign:'middle',
                                        marginRight: 3
                                    }}
                                >
                                    directions_run
                                </Icon>
                                { this.state.activities.length }
                            </span>
                        }
                    />

                    <Tab
                        icon={
                            <span>
                                <Icon
                                    style={{
                                        verticalAlign:'middle',
                                        marginRight: 6
                                    }}
                                >
                                    message
                                </Icon>
                                { this.state.comments.length }
                            </span>
                        }
                    />
                </Tabs>

                {
                    this.state.tabs.value === 0 &&
                    <List
                        style={{
                            overflowY: 'scroll'
                        }}
                    >
                        {
                            this.state.activities.map((event, i) => (
                                <Link
                                    key={ this.state.activities.length - i }
                                    to={'/activity/' + event._id}
                                    style={{ textDecoration:'none' }}
                                >
                                    <ListItem button>
                                        <Avatar
                                            src={ event.image }
                                            style={{
                                                height: 64,
                                                width: 64,
                                                border: '2px solid black'
                                            }}
                                            classes={{
                                                img: 'avatar-250'
                                            }}
                                        />

                                        <ListItemText
                                            classes={{ text:'overflow-text' }}
                                            primary={ event.name }
                                            secondary={ event.details }
                                        />

                                        <Typography
                                            type="caption"
                                            style={{
                                                position: 'absolute',
                                                right: 16,
                                                top: 16
                                            }}
                                        >
                                            { '' }
                                        </Typography>
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                }

                {
                    this.state.tabs.value === 1 &&
                    <List
                        style={{
                            overflowY: 'scroll',
                            maxHeight: 300
                        }}
                    >
                        {
                            this.state.comments.map((notify, i) => (
                                <Link
                                    key={ this.state.comments.length - i }
                                    to={ '/activity/' + notify.event._id }
                                    style={{ textDecoration:'none' }}
                                >
                                    <ListItem button>
                                        <ListItemText
                                            classes={{ text:'overflow-text' }}
                                            primary={ notify.event.name }
                                            secondary={ notify.details }
                                        />
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                }
            </div>
        );
    }
}

export default Profile;