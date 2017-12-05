import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import { CardMedia } from 'material-ui/Card';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import Slide from 'material-ui/transitions/Slide';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import AddActivity from './formActivity';
import Snack from './snackDefault';

import FormComment from "./formComment";
import FormShare from "./formShare";

import ListComments from "./listComments"
import ListDetail from './listDetail';
import ListMoments from './listMoments';
import ListUsers from './listUsers';

class Activity extends Component {
    state = {
        button: {
            function: this.handleShare,
            icon: 'share'
        },
        comment: {
            open: false
        },
        moment: {
            open: false
        },
        event: {
            address: {
                street: ''
            },
            city: '',
            coordinates: '',
            details: '',
            end: '',
            id: '',
            image: '',
            name: '',
            own: {},
            participants: [],
            price: 0,
            quotas: 0,
            start: ''
        },
        share: {
            open: false
        },
        snack: {
            open: false,
            message: ''
        },
        tabs: {
            value: 0
        },
        users: {
            open: false
        }
    };

    componentDidMount() {
        document.getElementById('header').classList.add('transparent');
        document.getElementById('shell').style.padding = 0;

        ['back', 'shared'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['settings', 'search', 'filter', 'down', 'title', 'edit', 'bottom-navigation'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        });

        document.getElementById('nav-empty').click();

        /*
         *
         */
        this.handleRequest(
            'get',
            'http://' + window.location.hostname + ':8081/events/' + window.location.pathname.split('/').pop(),
            this.handleUpdateEvent,
            true
        );
    }

    handleComment = () => {
        this.setState({
            comment: {
                open: !this.state.comment.open
            }
        })
    };

    handleRequest = (type, url, callback, async, data = {}) => {
        let request = new XMLHttpRequest();

        request.open(type.toUpperCase(), url, async);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        callback(JSON.parse(request.response));
                        break;
                    case 201:
                        callback(JSON.parse(request.response));
                        break;
                    case 403:
                        break;
                    case 500:
                        break;
                    default:
                        break;
                }
            }
        };

        request.send(JSON.stringify(data))
    };

    handleShare = () => {
        this.setState({
            share: {
                open: !this.state.share.open
            }
        })
    };

    handleUpdateEvent = (event) => {
        this.setState({
            event: event
        }, this.setButton);
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                open: typeof message === "string",
                message: typeof message === "string" ? message : ''
            }
        });
    };

    handleParticipate = () => {
        if (getCookie('userId') === '') {
            window.location.href = '/login'
        } else {
            let request = new XMLHttpRequest(), participants = this.state.event.participants;

            participants.push(getCookie('userId'));

            request.open('PATCH', 'http://' + window.location.hostname + ':8081/events/' + window.location.pathname.split('/').pop() , true);
            request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    switch (request.status) {
                        case 200:
                            window.location.reload();
                            break;
                        default:
                            break;
                    }
                }
            };

            request.send(
                JSON.stringify({
                    $addToSet: { participants: { $each: participants } }
                })
            )
        }
    };

    handleOpen = () => {
        if (this.state.open) {
            this.componentDidMount()
        }

        this.setState({
            open: !this.state.open
        })
    };

    handleUsers = () => {
        if (this.state.users.open) {
            this.componentDidMount()
        }

        this.setState({
            users: {
                open: !this.state.users.open
            }
        })
    };

    handleTabs = (event, value) => {
        this.setState({
            tabs: {
                value: value
            }
        })
    };

    isLogged = () => {
        return document.cookie.indexOf('userId') !== -1
    };

    isParticipant = () => {
        return this.state.event.participants.indexOf(getCookie('userId')) !== -1
    };

    render() {
        return (
            <div>
                <CardMedia
                    image={ this.state.event.image }
                    title="Contemplative Reptile"
                    style={{ boxShadow: 'inset 0px 350px 180px -300px #000, inset 0px -350px 180px -300px #000' }}
                >
                    <Typography
                        type="display1"
                        style={{
                            color: '#fafafa',
                            padding: '160px 16px 0',
                            textShadow: 'rgba(0,0,0,.18) 1px 1px'
                        }}
                    >
                        { this.state.event.name }
                    </Typography>

                    <Typography
                        type="subheading"
                        style={{
                            color: '#fafafa',
                            padding: '0 16px 26px',
                            textShadow: 'rgba(0,0,0,.18) 1px 1px'
                        }}
                    >
                        <Link
                            to={ "/user/" + this.state.event.own._id + "?from_url=/event/" + this.state.event._id }
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            @{ this.state.event.own.username }
                        </Link>
                    </Typography>
                </CardMedia>

                <Button
                    fab
                    color="accent"
                    aria-label="add"
                    onClick={ this.state.button.function }
                    style={{
                        margin:'-28px 16px 0 0',
                        float: 'right'
                    }}
                >
                    <Icon>{ this.state.button.icon }</Icon>
                </Button>

                <Typography
                    id="header-event"
                    style={{
                        padding: '16px 96px 26px 16px',
                        backgroundColor: '#212121',
                        lineHeight: 1.5,
                        color:'#fff'
                    }}
                    type="body1"
                >
                    <Icon
                        style={{
                            marginRight: 10,
                            verticalAlign: 'bottom'
                        }}
                    >
                        { this.state.event.price === 0 ? 'money_off' : 'attach_money' }
                    </Icon>

                    { this.state.event.price === 0 ? "Gratuito" : this.state.event.price + " CLP" }

                    <br/>

                    <Icon
                        style={{
                            marginRight: 10,
                            verticalAlign: 'bottom'
                        }}
                    >
                        group
                    </Icon>

                    <span
                        id="toggle-users"
                        onClick={ this.handleUsers }
                        style={{ cursor: 'pointer' }}
                    >
                        { this.state.event.participants.length + '/' + this.state.event.quotas }
                    </span>
                </Typography>

                <Tabs
                    value={ this.state.tabs.value }
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    onChange={ this.handleTabs }
                    style={{
                        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
                    }}
                >
                    <Tab id="loading" style={{ display: 'none' }}>&nbsp;</Tab>

                    <Tab
                        icon={ <Icon>info</Icon> }
                        id="information"
                        style={{ maxWidth: '100%' }}
                    />

                    {
                        this.isLogged() && this.isParticipant() &&
                        <Tab
                            icon={ <Icon>question_answer</Icon> }
                            id="comments"
                            style={{ maxWidth: '100%' }}
                        />
                    }

                    {
                        this.isLogged() && this.isParticipant() && new Date(Date.now()) > new Date(this.state.event.end) &&
                        <Tab
                            icon={ <Icon>collections</Icon> }
                            style={{ maxWidth: '100%' }}
                        />
                    }
                </Tabs>

                {
                    this.state.tabs.value === 1 &&
                    <ListDetail
                        detail={ this.state.event.details }
                        date={{
                            start: this.state.event.start,
                            end: this.state.event.end
                        }}
                        location={ this.state.event.address.street + ', ' + this.state.event.address.city + ', Chile' }
                    />
                }

                {
                    this.state.tabs.value === 2 &&
                    <ListComments query={{ event: this.state.event._id, type: 'comment', sort: 1 }}/>
                }

                {
                    this.state.tabs.value === 3 && new Date(Date.now()) > new Date(this.state.event.end) &&
                    <ListMoments query={{ event: this.state.event._id }}/>
                }

                <Dialog
                    id="dialog-edit"
                    fullScreen
                    open={ this.state.open }
                    onRequestClose={ this.handleRequestClose }
                    transition={<Slide direction="up" />}
                    style={{ top: 64 }}
                >
                    <AddActivity method="patch" activity={ this.state }/>
                </Dialog>

                <ListUsers
                    list={ this.state.event.participants }
                    onRequestClose={ this.handleUsers }
                    open={ this.state.users.open }
                />

                <FormComment
                    avatar={ '/images/user.png' }
                    onClose={ this.handleComment }
                    onSuccess={ this.setTabComments }
                    open={ this.state.comment.open }
                />

                <FormShare
                    onClose={ this.handleShare }
                    open={ this.state.share.open }
                />

                <Snack
                    open={ this.state.snack.open }
                    message={ this.state.snack.message }
                    close={ this.handleSnack }
                />
            </div>
        );
    }

    setButton = () => {
        this.setState({
            button: {
                function: this.isLogged() ? ( this.isParticipant() ? this.handleComment : this.handleParticipate ) : this.handleShare,
                icon: this.isLogged() ? ( this.isParticipant() ? 'message' : 'person_add' ) : 'share'
            }
        }, this.setTabInformation )
    };

    setTabComments = () => {
        document.getElementById('loading').click(); document.getElementById('comments').click()
    };

    setTabInformation = () => {
        document.getElementById('information').click();
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default Activity;