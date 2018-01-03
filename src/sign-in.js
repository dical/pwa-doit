import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FormBusiness from './components/forms/business';
import FormUser from './components/forms/user';

class SignIn extends Component {
    state = {
        tab: 'user'
    };

    handleClick = () => {
        if (document.querySelector('form button') !== null) { document.querySelector('form button').click() }
    };

    handleTabs = (event, value) => {
        this.setState({ tab: value })
    };

    render() {
        return (
            <div className='padding-top-128 padding-bottom-32'>
                <AppBar
                    position='fixed'
                    style={{ background: 'linear-gradient(45deg, #18252d 30%, #0a1014 90%)' }}
                >
                    <Toolbar>
                        <Link to='/'>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color='contrast'
                            />
                        </Link>

                        <Typography
                            children='Registrate'
                            color='inherit'
                            style={{ flex: 1, marginLeft: 16 }}
                            type='title'
                        />

                        <IconButton
                            children={ <Icon classes={{ root: 'bold' }}>check</Icon> }
                            color='inherit'
                            focusRipple
                            onClick={ this.handleClick }
                        />
                    </Toolbar>

                    <Tabs
                        fullWidth
                        indicatorColor='primary'
                        onChange={ this.handleTabs }
                        textColor='inherit'
                        value={ this.state.tab }
                    >
                        <Tab icon={ <Icon>person</Icon> } value='user'/>
                        <Tab icon={ <Icon>business</Icon>} value='business'/>
                    </Tabs>
                </AppBar>

                { this.state.tab === 'user' && <FormUser/> }
                { this.state.tab === 'business' && <FormBusiness/> }
            </div>
        );
    }
}

export default SignIn;
