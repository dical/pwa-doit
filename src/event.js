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
import DialogEvent from './components/dialogs/event';
import FormShare from './components/forms/share';
import GridMoments from './components/grids/moments';
import ListDetail from './components/lists/details';
import ListComments from './components/lists/comments';

import Snack from './components/snack';

import { get_cookie } from './helpers/cookie';

class Event extends Component {
    state = {
        button: {
            function: this.handleShare,
            icon: 'share'
        },
        edit: {
            open: false
        },
        event: {
            name: '',
            details: '',
            own: {
                names: '',
                image: ''
            },
            address: {}
        },
        inscriptions: [],
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

    canEdit = () => {
        return this.isOwner() && new Date(this.state.event.start) > Date.now()
    };

    componentDidMount() {
        this.handleRefresh()
    }

    handleComment = () => {
        this.setState({
            tabs: {
                value: 'message'
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

    handleEdit = () => {
        this.setState({
            edit: {
                open: !this.state.edit.open
            }
        })
    };

    handleMoment = () => {
        this.setState({
            tabs: {
                value: 'photo_library'
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
            this.handleRefresh
        )
    };

    handleRefresh = () => {
        this.handleRequest(
            'get',
            'http://' + window.location.hostname + ':8081/events/' + window.location.pathname.split('/').pop(),
            {},
            this.handleUpdateEvent
        );

        this.handleRequest(
            'get',
            'http://' + window.location.hostname + ':8081/inscriptions?event=' + window.location.pathname.split('/').pop(),
            {},
            this.handleUpdateInscriptions
        )
    };

    handleRefreshAction = () => {
        let _id = get_cookie('userId'), fun = this.handleShare, ico = 'share', val = 'info';

        if (_id !== '') {
            if (this.state.event.quotas > this.state.inscriptions.length && get_cookie('userRut') === undefined && Date.now() < new Date(this.state.event.start)) {
                fun = this.handleParticipate;
                ico = 'person_add';
            }

            if (this.state.inscriptions.some(hasUser) || this.state.event.own._id === _id) {
                fun = this.handleComment;
                ico     = 'comment';

                if (Date.now() > new Date(this.state.event.end)) {
                    fun = this.handleMoment;
                    ico = 'add_to_photos';
                }
            }
        }

        this.setState({
            button: {
                function: fun,
                icon: ico
            },
            tabs: {
                value: val
            }
        })
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

    handleUpdateEvent = (request) => {
        switch (request.status) {
            case 200:
                this.setState({ event: JSON.parse(request.response) }, this.handleRefreshAction);
                break;
            default:
                this.handleSnack('Sistema en mantenimiento');
                break;
        }
    };

    handleUpdateInscriptions = (request) => {
        switch (request.status) {
            case 200:
                this.setState({ inscriptions: JSON.parse(request.response) }, this.handleRefreshAction);
                break;
            default:
                this.handleSnack('Sistema en mantenimiento');
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

    handleUsers = () => {
        this.setState({
            users: {
                open: !this.state.users.open
            }
        })
    };

    isOwner = () => {
        return get_cookie('userId') === this.state.event.own._id
    };

    render() {
        return (
            <div id='event'>
                <AppBar
                    classes={{ root: 'transparent' }}
                    elevation={ 0 }
                    position='fixed'
                >
                    <Toolbar>
                        <Link to='/'>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color="contrast"
                            />
                        </Link>

                        <IconButton
                            children={ <Icon>{ this.canEdit() ? 'mode_edit' : 'share' }</Icon> }
                            color="contrast"
                            onClick={ this.canEdit() ? this.handleEdit : this.handleShare }
                            style={{ marginLeft: 'auto' }}
                        />
                    </Toolbar>
                </AppBar>

                <CardImage
                    avatar={ this.state.event.own.image }
                    image={this.state.event.image }
                    subtitle={ '@' + this.state.event.own.username }
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
                        background: 'linear-gradient(90deg, #18252d 30%, #0a1014 90%)'
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
                        <Icon>people</Icon>&nbsp;&nbsp;{ this.state.inscriptions.length + '/' + this.state.event.quotas }
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
                        value='info'
                    />

                    {
                        (this.state.inscriptions.some(hasUser) || this.state.event.own._id === getCookie('userId')) &&
                        <Tab
                            icon={ <Icon>message</Icon> }
                            style={{ maxWidth: '100%' }}
                            value='message'
                        />
                    }

                    {
                        new Date(this.state.event.end) < Date.now() &&
                        <Tab
                            icon={ <Icon>photo_library</Icon> }
                            style={{ maxWidth: '100%' }}
                            value='photo_library'
                        />
                    }
                </Tabs>

                {
                    this.state.tabs.value === 'info' &&
                    <ListDetail
                        detail={ this.state.event.details }
                        date={{
                            start: this.state.event.start,
                            end: this.state.event.end
                        }}
                        location={ this.state.event.address.street + ' #' + this.state.event.address.number  + ', ' + this.state.event.address.city + ', Chile' }
                    />
                }

                {
                    this.state.tabs.value === 'message' && (this.state.inscriptions.some(hasUser) || this.state.event.own._id === getCookie('userId')) &&
                    <ListComments query={ 'event=' + this.state.event._id + '&type=comment&sort=1' }/>
                }

                {
                    this.state.tabs.value === 'photo_library' && new Date(this.state.event.end) < Date.now() &&
                    <GridMoments query={ 'event=' + this.state.event._id }/>
                }

                <Snack
                    open={ this.state.snack.open }
                    message={ this.state.snack.message }
                    close={ this.handleSnack }
                />

                <DialogUsers
                    dataUsers={ this.state.inscriptions.map(getUser) }
                    onClose={ this.handleUsers }
                    onRefresh={ this.handleRefresh }
                    open={ this.state.users.open }
                />

                <DialogEvent
                    dataEvent={ this.state.event }
                    onClose={ this.handleEdit }
                    onRefresh={ this.handleRefresh }
                    open={ this.state.edit.open }
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

function getUser(inscription) {
    inscription.user['inscription'] = inscription._id;
    inscription.user['event'] = inscription.event;

    return inscription.user
}

function hasUser(inscription) {
    return inscription.user._id === get_cookie('userId')
}

export default Event;
