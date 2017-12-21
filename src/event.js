import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import CardImage from './components/cardImage';
import DialogUsers from './components/dialogs/users';
import FormShare from './components/forms/share';
import GridMoments from './components/grids/moments';
import ListDetail from './components/lists/details';
import ListComments from './components/lists/comments';
import Snack from './components/snackDefault';

class Event extends Component {
    state = {
        button: {
            function: this.handleShare,
            icon: 'share'
        },
        event: {
            name: '',
            details: '',
            own: {
                names: '',
                image: ''
            },
            address: {},
            participants: []
        },
        share: {
            open: false
        },
        snack: {
            message: '',
            open: false
        },
        tabs: {
            value: 0
        },
        users: {
            open: false
        }
    };

    componentDidMount() {
        this.handleRefresh()
    }

    handleComment = () => {
        this.setState({
            tabs: {
                value: 2
            }
        }, function() { document.getElementById('add').click() })
    };

    handleChange = (event, data) => {
        this.setState({
            tabs: {
                value: data
            }
        })
    };

    handleMoment = () => {
        this.setState({
            tabs: {
                value: 3
            }
        }, function() { document.getElementById('add').click() })
    };

    handleParticipate = () => {
        this.handleRequest(
            'post',
            'http://' + window.location.hostname + ':8081/inscriptions',
            {
                event: this.state.event._id,
                user: getCookie('userId')
            },
            this.handleResponseInscription
        )
    };

    handleRefresh = () => {
        this.handleRequest(
            'get',
            'http://' + window.location.hostname + ':8081/events/' + window.location.pathname.split('/').pop(),
            {},
            this.handleResponseEvent
        )
    };

    handleRequest = (type, url, body, callback) => {
        let request = new XMLHttpRequest();

        request.open(type.toUpperCase(), url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) { callback(request) }
        };

        request.send(JSON.stringify(body));
    };

    handleShare = () => {
        this.setState({
            share: {
                open: !this.state.share.open
            }
        })
    };

    handleResponseEvent = (request) => {
        switch (request.status) {
            case 200:
                this.handleUpdateEvent(request.response);
                break;
            default:
                break;
        }
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                message: typeof message === 'string' ? message : '',
                open: typeof message === 'string'
            }
        })
    };

    handleResponseInscription = (request) => {
        switch (request.status) {
            case 200:
                this.handleRefresh();
                break;
            default:
                this.handleSnack('Sistema en mantenimiento');
                break;
        }
    };

    handleUpdateEvent = (event) => {
        let json_event      = JSON.parse(event),
            user_id         = getCookie('userId'),
            function_button = this.handleShare,
            icon_button     = 'share';

        if (user_id !== '') {
            function_button = this.handleParticipate;
            icon_button     = 'person_add';

            if (user_id === json_event.own._id) {
                function_button = this.handleComment;
                icon_button     = 'comment';
            }

            if (Date.now() > new Date(json_event.end)) {
                function_button = this.handleMoment;
                icon_button     = 'add_to_photos';
            }
        }

        this.setState({
            button: {
                function: function_button,
                icon: icon_button
            },
            event: JSON.parse(event),
            tabs: {
                value: 1
            }
        })
    };

    handleUsers = () => {
        this.setState({
            users: {
                open: !this.state.users.open
            }
        })
    };

    render() {
        return (
            <div id='event'>
                <AppBar
                    elevation={ 0 }
                    position='fixed'
                    style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)' }}
                >
                    <Toolbar>
                        <Link to='/'>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color="contrast"
                            />
                        </Link>

                        <IconButton
                            children={ <Icon>more_vert</Icon> }
                            color="contrast"
                            style={{ marginLeft: 'auto' }}
                        />
                    </Toolbar>
                </AppBar>

                <CardImage
                    avatar={ this.state.event.own.image }
                    image={this.state.event.image }
                    subtitle={ '@' + this.state.event.own.names }
                    title={ this.state.event.name }
                />

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
                        padding: '16px 96px 16px 16px',
                        backgroundColor: '#212121'
                    }}
                    type="body1"
                >
                    <Button
                        dense
                        disableRipple
                        style={{ color: '#fff' }}
                    >
                        <Icon>{ this.state.event.price === 0 ? 'money_off' : 'attach_money' }</Icon>&nbsp;{ this.state.event.price === 0 ? "Gratuito" : this.state.event.price + " CLP" }
                    </Button>

                    <Button
                        dense
                        onClick={ this.handleUsers }
                        style={{ color: '#fff' }}
                    >
                        <Icon>people</Icon>&nbsp;&nbsp;{ this.state.event.participants.length + '/' + this.state.event.quotas }
                    </Button>
                </Typography>

                <Tabs
                    fullWidth
                    onChange={ this.handleChange }
                    style={{ boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)' }}
                    value={ this.state.tabs.value }
                >
                    <Tab style={{ display: 'none' }} />

                    <Tab
                        icon={ <Icon>info</Icon> }
                        style={{ maxWidth: '100%' }}
                    />

                    {
                        (this.state.event.participants.indexOf(getCookie('userId')) > -1 || this.state.event.own._id === getCookie('userId')) &&
                        <Tab
                            icon={ <Icon>message</Icon> }
                            style={{ maxWidth: '100%' }}
                        />
                    }

                    {
                        new Date(this.state.event.end) < Date.now() &&
                        <Tab
                            icon={ <Icon>photo_library</Icon> }
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
                    <ListComments query={ 'event=' + this.state.event._id + '&type=comment&sort=1' }/>
                }

                {
                    this.state.tabs.value === 3 &&
                    <GridMoments query={ 'event=' + this.state.event._id }/>
                }

                <Snack
                    open={ this.state.snack.open }
                    message={ this.state.snack.message }
                    close={ this.handleSnack }
                />

                <DialogUsers
                    onClose={ this.handleUsers }
                    open={ this.state.users.open }
                    users={ this.state.event.participants }
                />

                <FormShare
                    onClose={ this.handleShare }
                    open={ this.state.share.open }
                />
            </div>
        );
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default Event;