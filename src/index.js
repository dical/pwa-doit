import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import purple from 'material-ui/colors/purple';

import AppBar from 'material-ui/AppBar';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Activities from './components/listActivity';
import Activity from './components/detailActivity';
import AddActivity from './components/formActivity';
import Login from './components/formSession';
import Registry from './components/formUser';
import Profile from "./components/detailProfile";
import Settings from "./components/listSettings";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: purple
    }
});

class App extends React.Component {
    state = {
        title: 'newly added',
        navigation: 2,
        search: ''
    };

    handleActivities = () => {
        document.getElementById('activities').click()
    };

    handleBack = () => {
        if ( ['/registry', '/settings'].indexOf(window.location.pathname) > -1 ) {
            document.getElementById('nav-profile').click()
        } else {
            document.getElementById('nav-activities').click()
        }
    };

    handleChange = (event, value) => {
        this.setState({ navigation: value });
    };

    handleComments = () => {
        document.getElementById('comments').click()
    };

    handleUser = () => {
        if (getCookie('userId') === '') {
            document.getElementById('login').click()
        } else {
            document.getElementById('user').click()
        }
    };

    handleConfirm = () => {
        document.querySelector('form button').click()
    };

    render() {
        const { navigation } = this.state;

        return <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <div id="shell" style={{padding: '64px 0'}}>
                    <LinearProgress id="progress" color="accent" style={{position: 'fixed', top: 0, width: '100%', zIndex: 1200, display: 'none'}}/>

                    <AppBar id="header" color="primary" position="fixed">
                        <Toolbar style={{minHeight: 64}}>
                            <IconButton id='back' color="inherit" onClick={this.handleBack} style={{ marginLeft: '-12px' }}>
                                <Icon>arrow_back</Icon>
                            </IconButton>

                            <Typography id='title' color="inherit" type="title">{this.state.title}</Typography>

                            <IconButton id="down" color="inherit">
                                <Icon>keyboard_arrow_down</Icon>
                            </IconButton>

                            <IconButton id="search" color="inherit" style={{marginLeft: 'auto'}}>
                                <Icon>search</Icon>
                            </IconButton>

                            <IconButton id="filter" color="inherit">
                                <Icon>filter_list</Icon>
                            </IconButton>

                            <IconButton id="check" disabled color="inherit" style={{marginLeft: 'auto'}} onClick={this.handleConfirm}>
                                <Icon>check</Icon>
                            </IconButton>

                            <IconButton id="shared" color="inherit" style={{marginLeft: 'auto'}}>
                                <Icon>shared</Icon>
                            </IconButton>

                            <Link id='edit' to='/edit' style={{textDecoration: 'none', color: 'inherit', marginLeft: 0}}>
                                <IconButton color="inherit">
                                    <Icon>edit</Icon>
                                </IconButton>
                            </Link>

                            <Link id='settings' to='/settings' style={{textDecoration: 'none', color: 'inherit', marginLeft: 'auto'}}>
                                <IconButton color="inherit">
                                    <Icon>settings</Icon>
                                </IconButton>
                            </Link>
                        </Toolbar>
                    </AppBar>

                    <Switch>
                        <Route path="/activities" component={Activities}/>
                        <Route path="/activity" component={Activity}/>
                        <Route path="/login" component={Login}/>
                        <Route exact path="/" component={Login}/>
                        <Route path="/registry" component={Registry}/>
                        <Route path="/add" component={AddActivity}/>
                        <Route path="/user" component={Profile}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/edit" component={AddActivity}/>
                    </Switch>

                    <BottomNavigation
                        value={navigation}
                        onChange={ this.handleChange }
                        style={{
                            backgroundColor: '#E3F2FD',
                            bottom: 0,
                            position: 'fixed',
                            width: '100%'}}
                    >
                        <BottomNavigationButton id="nav-comments" onClick={this.handleComments} icon={<Icon>forum</Icon>}/>
                        <BottomNavigationButton id="nav-activities" onClick={this.handleActivities} icon={<Icon>home</Icon>}/>
                        <BottomNavigationButton id="nav-profile" onClick={this.handleUser} icon={<Icon>person</Icon>}/>
                        <BottomNavigationButton id="nav-empty" style={{ display: 'none' }}/>
                    </BottomNavigation>

                    <Link id='comments' to="/comments"/>
                    <Link id='activities' to="/activities"/>
                    <Link id='login' to="/login"/>
                    <Link id='user' to='/user'/>
                    <Link id='activity' to='/activity'/>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>;
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

render(<App/>, document.querySelector('#root'));
