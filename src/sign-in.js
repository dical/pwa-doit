import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FormBusiness from './components/forms/business';
import FormUser from './components/forms/user';

import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class SignIn extends Component {
    state = {
        check: false,
        tab: 'user'
    };

    handleChange = () => {
        this.setState({ check: !this.state.check })
    };

    handleClick = () => {
        if (document.querySelector('form button') !== null) { document.querySelector('form button').click() }
    };

    handleTabs = (event, value) => {
        this.setState({ tab: value })
    };

    render() {
        return (
            <div className='padding-top-128'>
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

                <div style={{ backgroundColor: '#eee', textAlign: 'center', padding: 16, marginTop: 16, paddingTop: 8, paddingBottom: 24 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={ this.state.check }
                                onChange={ this.handleChange }
                                value="checkedA"
                            />
                        }
                        label='Acepto terminos y condiciones de uso'
                    />

                    <Button
                        children='Registrarse'
                        color='primary'
                        disabled={ !this.state.check }
                        onClick={ this.handleClick }
                        raised
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        );
    }
}

export default SignIn;
