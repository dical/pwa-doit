import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FormBusiness from './components/formBusiness';
import FormUser from './components/formUser';

class SignIn extends Component {
    state = {
        tabs: {
            value: 0
        },
        _id: ''
    };

    handleClick = () => {
        if (document.querySelector('form button') !== null) {
            document.querySelector('form button').click()
        }
    };

    handleSession = (response) => {
        let expires = new Date();

        expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));

        document.cookie = "userId=" + JSON.parse(response)._id + ";expires="+ expires.toUTCString() +";path=/";

        this.setState({
            _id: JSON.parse(response)._id
        }, function() {
            document.getElementById('to-user').click()
        })
    };

    handleTabs = (event, value) => {
        this.setState({
            tabs: {
                value: value
            }
        })
    };

    render() {
        return (
            <div id='sign-in'>
                <AppBar position='fixed'>
                    <div id='header-radial-gradient'/>

                    <Toolbar>
                        <Link to='/'>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color="contrast"
                            />
                        </Link>

                        <Typography
                            children='Sign In'
                            color='inherit'
                            style={{ flex: 1, marginLeft: 16 }}
                            type='title'
                        />

                        <IconButton
                            children={ <Icon classes={{ root: 'bold' }}>check</Icon> }
                            color="accent"
                            onClick={ this.handleClick }
                        />
                    </Toolbar>

                    <Tabs
                        fullWidth
                        indicatorColor="primary"
                        onChange={ this.handleTabs }
                        style={{ background: '#0a1014' }}
                        textColor="inherit"
                        value={ this.state.tabs.value }
                    >
                        <Tab icon={ <Icon>person</Icon> }/>
                        <Tab icon={ <Icon>business</Icon>}/>
                    </Tabs>
                </AppBar>

                {
                    this.state.tabs.value === 0 &&
                    <FormUser onRequestSucess={ this.handleSession }/>
                }

                {
                    this.state.tabs.value === 1 &&
                    <FormBusiness onRequestSucess={ this.handleSession }/>
                }

                <Link id='to-user' to={ '/user/' + this.state._id }/>
            </div>
        );
    }
}

export default SignIn;