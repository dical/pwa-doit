import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListNotifications from './components/lists/notifications';
import Navigation from './components/navigation';

import { get_cookie } from './helpers/cookie';
import { request } from'./helpers/request';

class Messages extends Component {
    state = { query: '' };

    componentWillMount() {
        request('get', 'http://' + window.location.hostname + ':8081/inscriptions?user=' + get_cookie('userId'), {}, this.handleUpdate, true )
    }

    handleUpdate = (request) => {
        switch (request.status) {
            case 200:
                this.setState({ query : '?' + JSON.parse(request.response).map(function(inscription) { return 'event=' + inscription.event._id }).join('&') });
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div className='padding-top-64'>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Typography
                            children='Notificaciones'
                            color='inherit'
                            type='title'
                        />
                    </Toolbar>
                </AppBar>

                <ListNotifications query={ this.state.query }/>

                <Navigation value={ 'messages' }/>
            </div>
        );
    }
}

export default Messages;
