import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';

import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography'

import CardImage from './components/cardImage';

import GridMoments from './components/grids/moments';
import ListComments from './components/lists/comments';
import ListEvents from './components/lists/events';
import Navigation from './components/navigation';
import FormRank from "./components/forms/rank";

class User extends Component {
    state = {
        rank: {
            open: false,
            value: 0
        },
        tabs: {
            value: 0
        },
        user: {}
    };

    componentDidMount() {
        this.handleRequest('get', 'http://' + window.location.hostname + ':8081/users/' + window.location.pathname.split('/').pop(), {}, this.handleResponse)
        this.handleRequestRank()
    }

    handleChange = (event, data) => {
        this.setState({
            tabs: {
                value: data
            }
        })
    };

    handleRank = () => {
        this.setState({
            rank: {
                open: !this.state.rank.open,
                value: this.state.rank.value
            }
        }, this.handleRequestRank)
    };

    handleRequest = (type, url, body, callback) => {
        let request = new XMLHttpRequest();

        request.open(type.toUpperCase(), url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() { if (request.readyState === 4) { callback(request) } };

        request.send(JSON.stringify(body))
    };

    handleRequestRank = () => {
        this.handleRequest('get', 'http://' + window.location.hostname + ':8081/ranks?type=resume&user=' + window.location.pathname.split('/').pop(), {}, this.handleResponseRank)
    };

    handleResponseRank = (request) => {
        switch (request.status) {
            case 200:
                this.handleUpdateRank(JSON.parse(request.response));
                break;
            default:
                break;
        }
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

    handleUpdateRank = (rank) => {
        this.setState({
            rank: {
                open: this.state.rank.open,
                value: rank.average
            }
        })
    };

    handleUpdate = (user) => {
        this.setState({
            user: user,
            tabs: {
                value: 1
            }
        })
    };

    render() {
        return (
            <div style={{ paddingBottom: 56 }}>
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

                        <Link
                            style={{ marginLeft: 'auto' }}
                            to='/settings'
                        >
                            <IconButton
                                children={ <Icon>settings</Icon> }
                                color="contrast"
                            />
                        </Link>
                    </Toolbar>
                </AppBar>

                <CardImage
                    avatar={ this.state.user.image }
                    image={ this.state.user.image }
                    subtitle={ '@' + this.state.user.username }
                    title={ this.state.user.names + ' ' + this.state.user.surnames }
                    titleTextTransform='capitalize'
                />

                <Button fab color='accent' onClick={ this.handleRank } style={{ marginTop: -28, position: 'absolute', right: 16 }}>
                    <Badge badgeContent={ this.state.rank.value.toFixed(1) } color='primary'>
                        <Icon children='star' color='contrast'/>
                    </Badge>
                </Button>

                <FormRank close={ this.handleRank } open={ this.state.rank.open } user={ this.state.user }/>

                <Typography
                    type="body1"
                    style={{
                        background: 'linear-gradient(90deg, #18252d 30%, #0a1014 90%)',
                        color: '#fafafa',
                        padding: '16px 56px 22px 16px',
                        fontStyle: 'italic'
                    }}
                >
                    <Icon>format_quote</Icon> { this.state.user.phrase }
                </Typography>

                <Tabs
                    value={ this.state.tabs.value }
                    onChange={ this.handleChange }
                    style={{ boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)' }}
                    fullWidth
                >
                    <Tab
                        icon={ <Icon children=''/> }
                        style={{ display: 'none' }}
                    />

                    <Tab
                        icon={ <Icon children='directions_run'/> }
                        style={{ maxWidth: '100%' }}
                    />

                    <Tab
                        icon={ <Icon children='message'/> }
                        style={{ maxWidth: '100%' }}
                    />

                    <Tab
                        icon={ <Icon children='photo'/> }
                        style={{ maxWidth: '100%' }}
                    />
                </Tabs>

                {
                    this.state.tabs.value === 0 &&
                    'Loading user...'
                }

                {
                    this.state.tabs.value === 1 &&
                    <ListEvents
                        map={ event }
                        src={ 'http://' + window.location.hostname + ':8081/inscriptions?user=' + this.state.user._id }
                    />
                }

                {
                    this.state.tabs.value === 2 &&
                    <ListComments query={ 'user=' + this.state.user._id + '&type=comment&sort=1' }/>
                }

                {
                    this.state.tabs.value === 3 &&
                    <GridMoments query={ 'user=' + this.state.user._id }/>
                }

                <Navigation value={ 'user' }/>
            </div>
        );
    }
}

function event(inscription) { return inscription.event }

export default User;
