import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListMessages from './components/lists/messages';
import Navigation from './components/navigation';

class Messages extends Component {
    state = {
        categories: {
            open: false
        }
    };

    render() {
        return (
            <div style={{ paddingTop: 64 }}>
                <AppBar position='fixed'>
                    <div className='header-radial-gradient'/>

                    <Toolbar>
                        <Typography
                            children='Messages'
                            color='inherit'
                            type='title'
                        />
                    </Toolbar>
                </AppBar>

                <ListMessages query={ 'user=' + getCookie('userId') }/>

                <Navigation value={ 'messages' }/>
            </div>
        );
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default Messages;