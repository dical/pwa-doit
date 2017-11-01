import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import purple from 'material-ui/colors/deepOrange';

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
        primary: blueGrey,
        secondary: purple
    }
});

class App extends React.Component {
    state = {
        bottomNavigation: {
            value: 2
        },
        down: {
            icon: 'keyboard_arrow_down'
        },
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
            if ( document.getElementById('dialog-edit') !== null ) {
                document.getElementById('edit').click()
            } else {
                document.getElementById('nav-activities').click()
            }
        }
    };

    handleBottomNavigation = (event, value) => {
        this.setState({ bottomNavigation: { value: value } })
    };

    handleComments = () => {
        document.getElementById('comments').click()
    };

    handleDown = () => {
        this.setState({
            down: {
                icon: this.state.down.icon === 'keyboard_arrow_down' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
            }
        }, document.getElementById('toggle-tags').click())
    };

    handleEdit = () => {
        document.getElementById('toggle-edit').click()
    };

    handleFilters = () => {
        document.getElementById('open-filters').click()
    };

    handleSearch = () => {
        document.getElementById('div-search').style.display = document.getElementById('div-search').style.display === 'none' ? '' : 'none';
    };

    handleUser = () => {
        if (getCookie('userId') === '') {
            document.getElementById('login').click()
        } else {
            document.getElementById('user').click()
        }
    };

    render() {
        return <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <div id="shell">
                    <LinearProgress id="progress"/>
                    <AppBar
                        id="header"
                        position="fixed"
                    >
                        <Toolbar id="toolbar">
                            <IconButton
                                color="inherit"
                                id='back'
                                onClick={ this.handleBack }
                            >
                                <Icon>arrow_back</Icon>
                            </IconButton>

                            <Typography
                                color="inherit"
                                id='title'
                                type="title"
                            >
                                { this.state.title }
                            </Typography>

                            <IconButton
                                color="inherit"
                                id="down"
                                onClick={ this.handleDown }
                            >
                                <Icon>{ this.state.down.icon }</Icon>
                            </IconButton>

                            <IconButton
                                color="inherit"
                                id="search"
                                onClick={ this.handleSearch }
                            >
                                <Icon>search</Icon>
                            </IconButton>

                            <IconButton
                                color="inherit"
                                id="filter"
                                onClick={ this.handleFilters }
                            >
                                <Icon>filter_list</Icon>
                            </IconButton>

                            <IconButton
                                color="inherit"
                                id="shared"
                            >
                                <Icon>shared</Icon>
                            </IconButton>

                            <IconButton
                                color="inherit"
                                id='edit'
                                onClick={ this.handleEdit }
                            >
                                <Icon>edit</Icon>
                            </IconButton>

                            <Link id='settings' to='/settings' style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        id="bottom-navigation"
                        onChange={ this.handleBottomNavigation }
                        value={ this.state.bottomNavigation.value }
                    >
                        <BottomNavigationButton
                            id="nav-comments"
                            onClick={this.handleComments}
                            icon={ <Icon>forum</Icon> }
                        />

                        <BottomNavigationButton
                            id="nav-activities"
                            onClick={this.handleActivities}
                            icon={ <Icon>home</Icon> }
                        />

                        <BottomNavigationButton
                            id="nav-profile"
                            onClick={this.handleUser}
                            icon={ <Icon>person</Icon> }
                        />

                        <BottomNavigationButton id="nav-empty"/>
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
