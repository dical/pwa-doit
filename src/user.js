import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography'

import CardImage from './components/cardImage';

import GridMoments from './components/grids/moments';
import ListComments from './components/lists/comments';
import Navigation from './components/navigation';
import FormRank from "./components/forms/rank";

class User extends Component {
    state = {
        rank: {
            open: false
        },
        tabs: {
            value: 0
        },
        user: {}
    };

    componentDidMount() {
        this.handleRequest(this.handleUpdate)
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
                open: !this.state.rank.open
            }
        })
    };

    handleRequest = (callback) => {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://' + window.location.hostname + ':8081/users/' + window.location.pathname.split('/').pop(), true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        callback(request.response);
                        break;
                    default:
                        break;
                }
            }
        };

        request.send()
    };

    handleUpdate = (response) => {
        this.setState({
            user: JSON.parse(response),
            tabs: {
                value: 1
            }
        })
    };

    render() {
        return (
            <div>
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

                        <Link
                            style={{ marginLeft: 'auto' }}
                            to='/settings'
                        >
                            <IconButton
                                children={
                                    <IconButton
                                        children={ <Icon>settings</Icon> }
                                        color="contrast"
                                    />
                                }
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
                />

                <Button
                    fab
                    color="accent"
                    onClick={ this.handleRank }
                    style={{
                        color: '#fff',
                        margin: '-28px 0 0',
                        position: 'absolute',
                        right: 16,
                        lineHeight: 0.25
                    }}
                >
                    <Icon>star</Icon>
                </Button>

                <FormRank
                    onClose={ this.handleRank }
                    open={ this.state.rank.open }
                />

                <Typography
                    type="body1"
                    style={{
                        backgroundColor: '#0D47A1',
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
                    indicatorColor="primary"
                    style={{ boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)' }}
                    textColor="primary"
                    fullWidth
                >
                    <Tab icon={ <Icon children=''/> } style={{ display: 'none' }}/>
                    <Tab icon={ <Icon children='directions_run'/> }/>
                    <Tab icon={ <Icon children='message'/> }/>
                    <Tab icon={ <Icon children='photo'/> }/>
                </Tabs>

                {
                    this.state.tabs.value === 0 &&
                    'Loading user...'
                }

                {
                    this.state.tabs.value === 1 &&
                    <ListComments query={ 'user=' + this.state.user._id + '&type=notify&sort=1' }/>
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

export default User;